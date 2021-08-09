import { useState } from 'react';
import Layout from '@/components/Layout';
import useAuthStore from '@/stores/useAuthStore';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import toast from '@/helpers/toast';
import axios from '@/helpers/axios';
import IUser from '@/interfaces/IUser';
import withAuth from '@/helpers/withAuth';

const Profile = () => {
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);

  const detailsSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  });

  const passwordsSchema = yup.object().shape({
    current_password: yup.string().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  const updateDetails = async newData => {
    try {
      setDetailsLoading(true);
      const { data } = await axios.patch<IUser>('/auth/update', newData);
      toast('success', 'Updated successfully !');
      setDetailsLoading(false);
      updateUser(data);
    } catch (err) {
      setDetailsLoading(false);
      toast('error', err?.response?.data?.message);
    }
  };

  const updatePassword = async data => {
    try {
      setPasswordLoading(true);
      await axios.patch('/auth/update', { password: data.password });
      toast('success', 'Password updated successfully !');
      setPasswordLoading(false);
    } catch (err) {
      setPasswordLoading(false);
      toast('error', err?.response?.data?.message);
    }
  };

  return (
    <Layout title='Profile'>
      <div>
        <h1 className='text-3xl font-semibold'>Details</h1>
        <Form
          className='mt-4'
          onSubmit={updateDetails}
          defaultValues={{ name: user.name, email: user.email }}
          schema={detailsSchema}
        >
          <div className='sm:flex space-y-6 sm:space-x-8 sm:space-y-0'>
            <div className='sm:w-1/2'>
              <label htmlFor='name' className='block text-sm mb-2'>
                Name
              </label>
              <FormInput name='name' id='name' type='text' />
            </div>
            <div className='sm:w-1/2'>
              <label htmlFor='email' className='block text-sm mb-2'>
                Email
              </label>
              <FormInput name='email' id='email' type='email' />
            </div>
          </div>
          <button
            className='px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600
            text-white mt-6 focus:outline-none focus:bg-indigo-600 flex justify-center
            items-center'
            type='submit'
          >
            {detailsLoading ? (
              <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Update Details'
            )}
          </button>
        </Form>
      </div>
      <div className='mt-8'>
        <h1 className='text-3xl font-semibold'>Password</h1>
        <Form
          className='mt-4 space-y-6'
          onSubmit={updatePassword}
          schema={passwordsSchema}
        >
          <div>
            <label htmlFor='current_password' className='block text-sm mb-2'>
              Current Password
            </label>
            <FormInput name='current_password' id='current_password' type='password' />
          </div>
          <div className='sm:flex space-y-6 sm:space-x-8 sm:space-y-0'>
            <div className='sm:w-1/2'>
              <label htmlFor='password' className='block text-sm mb-2'>
                Password
              </label>
              <FormInput name='password' id='password' type='password' />
            </div>
            <div className='sm:w-1/2'>
              <label htmlFor='confirm_password' className='block text-sm mb-2'>
                Confirm Password
              </label>
              <FormInput name='confirm_password' id='confirm_password' type='password' />
            </div>
          </div>
          <button
            className='px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600
            text-white mt-6 focus:outline-none focus:bg-indigo-600 flex justify-center
            items-center'
            type='submit'
          >
            {passwordLoading ? (
              <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Update Password'
            )}
          </button>
        </Form>
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
