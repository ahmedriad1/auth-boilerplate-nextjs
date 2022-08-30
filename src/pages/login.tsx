import Button from '@/components/Button';
import useAuthStore, { AuthStatus } from '@/stores/useAuthStore';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import toast from '@/helpers/toast';
import { useMutation } from '@/helpers/axios';
import Link from 'next/link';
import HeadlessLayout from '@/components/HeadlessLayout';
import withGuest from '@/helpers/withGuest';
import LazyImage from '@/components/LazyImage';
import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { guestRoute } from '@/helpers/auth';

const Login = () => {
  // const sendEmail = useAuthStore(state => state.sendEmail);
  // const status = useAuthStore(state => state.status);
  // const email = useAuthStore(state => state.email);
  const [emailSent, setEmailSent] = useState(false);

  // const isAwaitingSignup = status === AuthStatus.AWAITING_SIGNUP;

  const [loginMutation, { loading }] = useMutation<{ message: string }>(
    '/auth/send_magic_link',
    {
      onSuccess: ({ message }) => {
        toast.success(message);
        setEmailSent(true);
      },
    },
  );

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

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
                  alt='Logo'
                />
              </a>
            </Link>
            <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
              Sign in or create a new account
            </h2>
            {/* <p className='mt-2 text-center text-sm leading-5 text-gray-600'>
              Or
              <Link href='/register'>
                <a className='ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                  Need an account ?
                </a>
              </Link>
            </p> */}
          </div>
          {emailSent ? (
            <div className='mt-8 w-full px-4 py-2 shadow-md bg-white rounded flex items-center'>
              <CheckCircleIcon className='text-green-500 w-6 h-6 mr-4' /> Email is sent
            </div>
          ) : (
            <Form onSubmit={loginMutation} schema={schema} className='mt-8'>
              <div>
                <div>
                  <FormInput name='email' type='email' placeholder='Email address' />
                </div>

                <div className='mt-6'>
                  <Button loading={loading} full>
                    Send magic link
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </HeadlessLayout>
  );
};

export const getServerSideProps = guestRoute;

export default withGuest(Login);
