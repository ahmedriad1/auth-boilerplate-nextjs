import { initializeAuthStore } from '@/stores/useAuthStore';
import { AuthError, User } from '@/types';
import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from './axios';

// we need to know if getServerSideProps is being called initially or when transition between pages (user data will be already loaded)
const isTransition = (req: GetServerSidePropsContext['req']) =>
  !req || (req.url && req.url.startsWith('/_next/data'));

export const getSession = async (req: GetServerSidePropsContext['req']) => {
  const store = initializeAuthStore();

  let loggedIn = false;
  let awaitingSignup = false;

  const cookies = req!.headers?.cookie as string;

  if (cookies) {
    try {
      const { data } = await axios.get<User>('/auth/me', {
        headers: {
          // Host: new URL(req.url).host,
          Cookie: cookies,
        },
      });
      store.getState().login({ user: data });
      // console.log(data);
      loggedIn = true;
    } catch (err: unknown) {
      const error = err as AxiosError<AuthError>;
      if (error?.response?.data) console.log(error.response.data);

      if (error?.response?.data && 'awaitingSignup' in error?.response?.data) {
        store.getState().sendEmail({ email: error.response.data.email });
        awaitingSignup = true;
      }
    }
  }

  return {
    session: JSON.parse(JSON.stringify(store.getState())),
    loggedIn,
    awaitingSignup,
  };
};

export const protectedRoute: GetServerSideProps = async ({ req }) => {
  if (isTransition(req)) return { props: {} };

  const { session, loggedIn } = await getSession(req);
  if (!loggedIn) return { redirect: { destination: '/', statusCode: 307 }, props: {} };
  return {
    props: {
      session,
    },
  };
};

export const guestRoute: GetServerSideProps = async ({ req }) => {
  if (isTransition(req)) return { props: {} };

  const { session, loggedIn } = await getSession(req);
  if (loggedIn) return { redirect: { destination: '/', statusCode: 307 }, props: {} };

  return {
    props: {
      session,
    },
  };
};

export const awaitingSignupRoute: GetServerSideProps = async ({ req }) => {
  if (isTransition(req)) return { props: {} };

  const { session, loggedIn, awaitingSignup } = await getSession(req);
  if (loggedIn || !awaitingSignup)
    return { redirect: { destination: '/', statusCode: 307 }, props: {} };

  return {
    props: {
      session,
    },
  };
};

export const neutralRoute: GetServerSideProps = async ({ req }) => {
  if (isTransition(req)) return { props: {} };

  return {
    props: {
      session: (await getSession(req)).session,
    },
  };
};
