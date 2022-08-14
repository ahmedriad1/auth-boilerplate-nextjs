import Button from '@/components/Button';
import useAuthStore from '@/stores/useAuthStore';
import toast from '../helpers/toast';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import { useMutation } from '@/helpers/axios';
import Link from 'next/link';
import HeadlessLayout from '@/components/HeadlessLayout';
import withGuest from '@/helpers/withGuest';
import LazyImage from '@/components/LazyImage';
import type { AuthenticatedResponse } from '@/types';

const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup
      .string()
      .min(8)
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  const login = useAuthStore(state => state.login);
  const [registerMutation, { loading }] = useMutation<AuthenticatedResponse>(
    '/auth/register',
    {
      onSuccess({ user, token, refresh_token }) {
        toast.success('Account created successfully !');
        login({ user, token, refreshToken: refresh_token });
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
              Create an account
            </h2>
            <p className='mt-2 text-center text-sm leading-5 text-gray-600'>
              Or
              <Link href='/login'>
                <a className='ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                  Already have an account ?
                </a>
              </Link>
            </p>
          </div>
          <Form className='mt-8' onSubmit={registerMutation} schema={schema}>
            <div>
              <div>
                <FormInput name='name' type='text' placeholder='Name' />
              </div>
              <div className='mt-3'>
                <FormInput name='email' type='email' placeholder='Email address' />
              </div>
              <div className='mt-3'>
                <FormInput name='password' type='password' placeholder='Password' />
              </div>

              <div className='mt-3'>
                <FormInput
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm Password'
                />
              </div>
            </div>

            <div className='mt-6'>
              <Button loading={loading} full>
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </HeadlessLayout>
  );
};

export default withGuest(Register);
