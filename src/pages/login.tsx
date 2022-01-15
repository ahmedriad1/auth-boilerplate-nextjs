import { useState } from 'react';
import Button from '@/components/Button';
import useAuthStore from '@/stores/useAuthStore';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import toast from '@/helpers/toast';
import axios from '@/helpers/axios';
import Link from 'next/link';
import HeadlessLayout from '@/components/HeadlessLayout';
import withGuest from '@/helpers/withGuest';
import type { AuthenticatedResponse } from '@/types';
import LazyImage from '@/components/LazyImage';

const Login = () => {
  const setLogin = useAuthStore(state => state.login);
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const {
        data: { user, token, refresh_token },
      } = await axios.post<AuthenticatedResponse>('/auth/login', data);
      toast('success', 'Logged in successfully !');
      setLogin({ user, token, refreshToken: refresh_token });
    } catch (err) {
      toast('error', err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm leading-5 text-gray-600'>
              Or
              <Link href='/register'>
                <a className='ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                  Need an account ?
                </a>
              </Link>
            </p>
          </div>
          <Form onSubmit={onSubmit} schema={schema} className='mt-8'>
            <div>
              <div>
                <FormInput name='email' type='email' placeholder='Email address' />
              </div>
              <div className='mt-3'>
                <FormInput name='password' type='password' placeholder='Password' />
              </div>
              <div className='mt-6'>
                <Button loading={loading}>Sign in</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </HeadlessLayout>
  );
};

export default withGuest(Login);
