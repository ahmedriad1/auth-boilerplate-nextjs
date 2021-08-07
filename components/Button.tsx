const Button = ({ loading, ...props }) => (
  <button
    type='submit'
    disabled={loading}
    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-75'
  >
    {loading ? (
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ) : (
      props.children
    )}
  </button>
);

export default Button;
