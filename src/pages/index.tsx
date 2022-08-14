import Button from '@/components/Button';
import Layout from '@/components/Layout';
import LazyImage from '@/components/LazyImage';
import useAuthStore from '@/stores/useAuthStore';
import Link from 'next/link';

const Home = () => {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  return (
    <Layout title='Home'>
      <div className='px-4 py-6 sm:px-0'>
        <h1 className='text-3xl font-semibold'>Welcome to Auth boilerplate</h1>
        <p className='text-lg leading-relaxed mt-4'>
          This is a boilerplate for creating an authentication system with Nest.js for the
          backend and Next.js on the client.
        </p>

        {!isLoggedIn && (
          <div className='mt-3'>
            <Link href='/login' passHref>
              <Button as='a'>Login</Button>
            </Link>
            <Link href='/register' passHref>
              <Button as='a' secondary className='ml-4'>
                Register
              </Button>
            </Link>
          </div>
        )}
        <p className='mt-8'>Technologies used:</p>
        {/* Nestjs, Postgres, Prisma, Nextjs, TailwindCSS, HeadlessUI, Zustand */}
        <ul className='mt-2 flex'>
          <li className='flex items-center'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/nestjs.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Nestjs'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Nestjs</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/postgres.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Postgres'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Postgres</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/prisma.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Prisma'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Prisma</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/nextjs.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Nextjs'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Nextjs</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/tailwindcss.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Tailwindcss'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Tailwindcss</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/headlessui.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='HeadlessUI'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>HeadlessUI</p>
            </div>
          </li>
          <li className='flex items-center mt-4'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/zustand.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Zustand'
              />
            </div>
            <div className='ml-4'>
              <p className='text-sm leading-5 font-medium text-gray-900'>Zustand</p>
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
