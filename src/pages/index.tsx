import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useAuthStore, { AuthStatus } from '@/stores/useAuthStore';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/outline';
import { neutralRoute } from '@/helpers/auth';

// Nestjs, Postgres, Prisma, Nextjs, TailwindCSS, HeadlessUI, Zustand
const technologies = [
  { name: 'NestJS', url: 'https://nestjs.com/' },
  { name: 'Planetscale (MySql)', url: 'https://planetscale.com/' },
  { name: 'Prisma', url: 'https://prisma.io/' },
  { name: 'Nextjs', url: 'https://nextjs.org/' },
  { name: 'TailwindCSS', url: 'https://tailwindcss.com/' },
  { name: 'HeadlessUI', url: 'https://headlessui.dev/' },
  { name: 'Zustand', url: 'https://github.com/pmndrs/zustand' },
  { name: 'Fly.io', url: 'https://fly.io' },
  { name: 'Vercel', url: 'https://vercel.com/' },
  {
    name: 'Docker',
    url: 'https://docker.com',
  },
  {
    name: 'Sentry',
    url: 'https://sentry.io',
  },
  {
    name: 'Sendgrid',
    url: 'https://sendgrid.com/',
  },
  {},
];

const Home = () => {
  const status = useAuthStore(s => s.status);

  const isLoggedIn = status === AuthStatus.AUTHENTICATED;

  return (
    <Layout title='Home'>
      <div className='px-4 py-6 sm:px-0'>
        <h1 className='text-3xl font-semibold'>Welcome to Auth boilerplate</h1>
        <p className='text-lg leading-relaxed mt-4'>
          This is a boilerplate for creating a passwordless authentication system with
          Nest.js for the backend and Next.js on the client.
        </p>

        <div className='mt-6'>
          {isLoggedIn ? (
            <Link href='/profile' passHref>
              <Button as='a'>View profile</Button>
            </Link>
          ) : (
            <Link href='/login' passHref>
              <Button as='a'>Login or create an account</Button>
            </Link>
          )}
        </div>
        <div className='mt-12'>
          <p className='text-xl font-medium'>Technologies used:</p>
          <ul className='mt-3'>
            {technologies.map(({ name, url }, idx) => (
              <li key={idx}>
                <a
                  className='text-lg font-medium hover:underline underline-offset-2 text-indigo-600'
                  href={url}
                  target='_blank'
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className='mt-28 flex justify-center items-center'>
          <p className='flex justify-center items-center text-lg'>
            Made with <HeartIcon className='mx-1 w-5 h-5 text-indigo-600' /> by
            <a href='https://ar1.dev/' target='_blank' className='ml-2 text-indigo-600'>
              Ahmed
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export const getServerSideProps = neutralRoute;

export default Home;
