import Head from 'next/head';
import Nav from './Nav';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title = 'Home', children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Auth Boilerplate</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Nav />

        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold leading-tight text-gray-900'>{title}</h1>
          </div>
        </header>

        <main>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
