import axios from '@/helpers/axios';
import { User } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

type VerifyTokenResponse =
  | { message: string; user: User }
  | { message: string; awaitingSignup: boolean; email: string };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;
  if (!token || !req.headers.cookie) return res.redirect('/');

  try {
    const { headers, data } = await axios.get<VerifyTokenResponse>(
      `/auth/verify?token=${token}`,
      {
        headers: {
          // Host: 'auth.ar1.dev',
          // Cookie: req.headers.cookie,
          ...req.headers,
        },
      },
    );
    const awaitingSignup = 'awaitingSignup' in data ? data.awaitingSignup : undefined;
    const cookie = headers['set-cookie'];
    console.log(data);
    if (cookie && cookie.length) res.setHeader('set-cookie', cookie);
    return res.redirect(awaitingSignup ? '/register' : '/');
  } catch (e) {
    if (e.response?.data) console.log(e.response.data);
    return res.redirect('/');
  }
};

export default handler;
