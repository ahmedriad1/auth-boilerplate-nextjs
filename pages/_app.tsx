import useAuthStore from '@/stores/useAuthStore';
import '@/styles/main.css';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from '@/helpers/axios';
import IAuthenticatedResponse from '@/interfaces/IAuthenticatedResponse';
import { setRefreshToken, getRefreshToken } from '@/helpers/auth';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const login = useAuthStore(state => state.login);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      let refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const {
            data: { user, token },
          } = await axios.post<IAuthenticatedResponse>('/auth/refresh', {
            refresh_token: refreshToken,
          });
          login({ user, token });
          setIsLoading(false);
        } catch (error) {
          setRefreshToken(null);
          setIsLoading(false);
        }
      } else setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) return null;

  if (pageProps.protected && !isLoggedIn) {
    router.push('/login');
    return null;
  }

  if (pageProps.guest && isLoggedIn) {
    router.push('/');
    return null;
  }

  return (
    <div className='app relative'>
      <Toaster position='top-right' reverseOrder={false} />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
