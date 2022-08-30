import Button from '@/components/Button';
import useAuthStore, { AuthStatus } from '@/stores/useAuthStore';
import toast from '../helpers/toast';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import { useMutation } from '@/helpers/axios';
import Link from 'next/link';
import HeadlessLayout from '@/components/HeadlessLayout';
import withGuest from '@/helpers/withGuest';
import LazyImage from '@/components/LazyImage';
import type { User } from '@/types';
import { InformationCircleIcon } from '@heroicons/react/outline';
import withAwaitingSignupGuest from '@/helpers/withAwaitingSignupGuest';
import { awaitingSignupRoute } from '@/helpers/auth';

const Register = () => {
  const email = useAuthStore(state => state.email);
  const awaitingSignup =
    useAuthStore(state => state.status) === AuthStatus.AWAITING_SIGNUP;
  const login = useAuthStore(state => state.login);

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const [registerMutation, { loading }] = useMutation<{ message: string; user: User }>(
    '/auth/signup',
    {
      onSuccess({ message, user }) {
        toast.success(message);
        login({ user });
      },
    },
  );

  return (
    <HeadlessLayout>
      <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <div>
            <Link href='/'>
              <a className='flex justify-center'>
                <LazyImage
                  width={48}
                  height={48}
                  className='mx-auto h-12 w-auto'
                  src='/logo-white.svg'
                  alt='Workflow'
                />
              </a>
            </Link>
            <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
              Complete your registration
            </h2>
          </div>
          <Form className='mt-8' onSubmit={registerMutation} schema={schema}>
            <div>
              <div className='flex items-center'>
                <InformationCircleIcon className='mr-3 w-5 h-5 text-indigo-500' />{' '}
                Creating account as: <strong className='ml-2'>{email}</strong>
              </div>
              <div className='mt-3'>
                <FormInput name='name' type='text' placeholder='Name' />
              </div>
            </div>

            <div className='mt-6'>
              <Button loading={loading} full>
                Signup
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </HeadlessLayout>
  );
};

export const getServerSideProps = awaitingSignupRoute;
export default withAwaitingSignupGuest(Register);
