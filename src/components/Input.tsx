import clsx from 'clsx';

const Input = ({ inputRef, error, ...props }) => (
  <>
    <input
      className={clsx(
        'appearance-none rounded-md relative block w-full px-3 py-2 border text-gray-900 focus:outline-none focus:shadow-outline-blue focus:z-10 sm:text-sm sm:leading-5',
        error
          ? 'border-red-300 placeholder-red-500 focus:border-red-300'
          : 'border-gray-300 placeholder-gray-500 focus:border-blue-300',
      )}
      {...props}
      ref={inputRef}
    />
    {error && <span className='text-red-600 text-xs font-medium'>{error}</span>}
  </>
);

export default Input;
