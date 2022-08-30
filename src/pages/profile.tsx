import Layout from '@/components/Layout';
import useAuthStore from '@/stores/useAuthStore';
import Form from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import * as yup from 'yup';
import toast from '@/helpers/toast';
import { useMutation } from '@/helpers/axios';
import withAuth from '@/helpers/withAuth';
import type { User } from '@/types';
import Button from '@/components/Button';
import { protectedRoute } from '@/helpers/auth';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);

  const detailsSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const [updateMutation, { loading }] = useMutation<User>('/auth/update', {
    method: 'patch',
    onSuccess(data) {
      toast.success('Updated successfully !');
      updateUser(data);
    },
  });

  return (
    <Layout title='Profile'>
      <div>
        <h1 className='text-3xl font-semibold'>Details</h1>
        <Form
          className='mt-4'
          onSubmit={updateMutation}
          defaultValues={{ name: user.name }}
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
              <FormInput
                name='email'
                value={user.email}
                id='email'
                type='email'
                disabled
              />
            </div>
          </div>
          <Button className='mt-6' loading={loading}>
            Update Details
          </Button>
        </Form>
      </div>
    </Layout>
  );
};
export const getServerSideProps = protectedRoute;

export default withAuth(Profile);
