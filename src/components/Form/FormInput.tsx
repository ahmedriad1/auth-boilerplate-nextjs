import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const FormInput = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <>
      <input
        className={clsx(
          'appearance-none rounded-md relative block w-full px-3 py-2 border text-gray-900 focus:outline-none focus:shadow-outline-blue focus:z-10 sm:text-sm sm:leading-5',
          error
            ? 'border-red-300 placeholder-red-500 focus:border-red-300'
            : 'border-gray-300 placeholder-gray-500 focus:border-blue-300',
        )}
        {...props}
        {...register(name)}
      />
      {error && (
        <span className='text-red-600 text-xs font-medium'>{(error as any).message}</span>
      )}
    </>
  );
};

export default FormInput;
