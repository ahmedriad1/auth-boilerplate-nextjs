import '@/styles/main.css';
import {
  initializeAuthStore,
  AuthStoreProvider,
  useCreateAuthStore,
} from '@/stores/useAuthStore';
import { Toaster } from 'react-hot-toast';
import axios from '@/helpers/axios';
import IAuthenticatedResponse from '@/interfaces/IAuthenticatedResponse';
import { REFRESH_TOKEN_NAME } from '@/helpers/auth';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { isBrowser } from '@/helpers/functions';

interface MyAppProps extends AppProps {
  initialZustandState: object;
}

const MyApp = ({ Component, pageProps, initialZustandState }: MyAppProps) => {
  const createStore = useCreateAuthStore(initialZustandState);

  return (
    <div className='app relative'>
      <AuthStoreProvider createStore={createStore}>
        <Toaster position='top-right' reverseOrder={false} />
        <Component {...pageProps} />
      </AuthStoreProvider>
    </div>
  );
};

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  if (isBrowser()) return { ...appProps };

  const store = initializeAuthStore();

  const request = appContext.ctx.req;
  const refreshToken = request ? request.cookies[REFRESH_TOKEN_NAME] : null;

  if (refreshToken) {
    try {
      const { data } = await axios.post<IAuthenticatedResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });
      store.getState().login({ user: data.user, token: data.token });
    } catch (error) {
      request.cookies[REFRESH_TOKEN_NAME] = null;
    }
  }

  return {
    ...appProps,
    initialZustandState: JSON.parse(JSON.stringify(store.getState())),
  };
};

export default MyApp;
