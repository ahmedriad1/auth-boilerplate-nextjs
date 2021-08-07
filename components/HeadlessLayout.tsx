import Head from 'next/head';

const HeadlessLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Auth Boilerplate</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </>
  );
};

export default HeadlessLayout;
