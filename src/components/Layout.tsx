import Head from 'next/head';
import Nav from './Nav';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Auth Boilerplate` : 'Auth Boilerplate'}</title>
        <link rel='icon' href='/logo.svg' />
      </Head>

      <div>
        <Nav />

        <main>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
