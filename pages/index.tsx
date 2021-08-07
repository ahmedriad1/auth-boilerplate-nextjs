import Layout from '@/components/Layout';
import toast from '@/helpers/toast';
import { GetServerSideProps } from 'next';

const Home = ({ data }) => {
  return (
    <Layout title='test'>
      <div className='px-4 py-6 sm:px-0'>
        <button
          onClick={() => toast('success', 'Success !')}
          className='text-white bg-green-600 hover:bg-green-500 px-3 py-1 rounded'
        >
          Success Toast
        </button>
        <button
          onClick={() => toast('error', 'Error !')}
          className='text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded ml-3'
        >
          Error Toast
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  // console.log(context.req.cookies);

  return {
    props: {
      data: 'Hello world 1',
      cookies: context.req.cookies,
    },
  };
};

export default Home;
