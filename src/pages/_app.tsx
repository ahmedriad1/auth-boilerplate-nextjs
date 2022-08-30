import '@/styles/main.css';
import { AuthStoreProvider, useCreateAuthStore } from '@/stores/useAuthStore';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
// import NextApp from 'next/app';

interface MyAppProps extends AppProps {
  pageProps: { session: any };
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) => {
  const createStore = useCreateAuthStore(session);

  return (
    <div className='app relative'>
      <AuthStoreProvider createStore={createStore}>
        <Toaster position='top-right' reverseOrder={false} />
        <Component {...pageProps} />
      </AuthStoreProvider>
    </div>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   if (isBrowser()) return { ...appProps };

//   const store = initializeAuthStore();
//   const { req, res } = appContext.ctx;

//   let loggedIn = false;
//   let awaitingSignup = false;

//   const cookies = req!.headers?.cookie as string;

//   if (cookies) {
//     try {
//       console.log('Checking user...');

//       const { data } = await axios.get<User>('/auth/me', {
//         headers: {
//           // Host: new URL(req.url).host,
//           Cookie: cookies,
//         },
//       });
//       store.getState().login({ user: data });
//       // console.log(data);
//       loggedIn = true;
//     } catch (err: unknown) {
//       const error = err as AxiosError<AuthError>;
//       if (error?.response?.data && 'awaitingSignup' in error?.response?.data) {
//         store.getState().sendEmail({ email: error.response.data.email });
//         awaitingSignup = true;
//       }
//     }
//   }

//   // appContext.ctx.loggedIn = loggedIn;
//   const getInitialProps = appContext.Component?.getInitialProps;
//   if (getInitialProps) {
//     const response: any = await getInitialProps({
//       ...appContext,
//       loggedIn,
//       awaitingSignup,
//     } as any);
//     if (response?.redirect) {
//       res.writeHead(302, { Location: response?.redirect });
//       res.end();
//     }
//   }

//   return {
//     ...appProps,
//     initialZustandState: JSON.parse(JSON.stringify(store.getState())),
//   };
// };

export default MyApp;
