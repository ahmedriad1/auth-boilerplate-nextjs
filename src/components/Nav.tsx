import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast from '@/helpers/toast';
import LazyImage from '@/components/LazyImage';
import clsx from 'clsx';
import useAuthStore from '@/stores/useAuthStore';

const ProfileDropdown = () => {
  const setLogout = useAuthStore(state => state.logout);

  const logout = e => {
    e.preventDefault();
    setLogout();
    toast.success('Logged out !');
  };

  const ProfileLink = ({ active, ...props }: { active: boolean }) => (
    <Link href='/profile'>
      <a
        className={clsx('block px-4 py-2 text-sm text-gray-700', active && 'bg-gray-100')}
        {...props}
      >
        Your Profile
      </a>
    </Link>
  );

  return (
    <Menu as='div' className='ml-3 relative'>
      <div>
        <Menu.Button className='max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid'>
          <LazyImage
            width={32}
            height={32}
            className='h-8 w-8 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt='Profile picture'
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100 transform'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75 transform'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
          <div className='py-1 rounded-md bg-white shadow-xs'>
            <Menu.Item>
              {/* I did that because i wanted to pass the menu item props to the <a> not <Link> */}
              {({ active }) => <ProfileLink active={active} />}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/logout'
                  onClick={logout}
                  className={clsx(
                    'block px-4 py-2 text-sm text-gray-700',
                    active && 'bg-gray-100',
                  )}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, user, logout: setLogout } = useAuthStore();

  const logout = e => {
    e.preventDefault();
    setLogout();
    toast.success('Logged out !');
  };

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <LazyImage
                src='/logo.svg'
                width={32}
                height={32}
                className='h-8 w-8'
                alt='Logo'
              />
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline'>
                <Link
                  href='/'

                  // activeClassName='text-white bg-gray-900 hover:bg-gray-900'
                >
                  <a className='px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-700'>
                    Home
                  </a>
                </Link>
                <Link
                  href='/about'
                  // activeClassName='text-white bg-gray-900 hover:bg-gray-900'
                >
                  <a className='px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-700'>
                    About
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            {isLoggedIn ? (
              <div className='ml-4 flex items-center md:ml-6'>
                <ProfileDropdown />
              </div>
            ) : (
              <div>
                <Link href='/login'>
                  <a className='ml-4 px-5 py-2 rounded-md text-sm font-medium text-gray-200 focus:outline-none focus:text-white focus:bg-indigo-600 hover:text-white hover:bg-indigo-600 bg-indigo-500'>
                    Login
                  </a>
                </Link>
              </div>
            )}
          </div>

          <div className='-mr-2 flex md:hidden'>
            {/* <!-- Mobile menu button --> */}
            <button
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white'
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <svg
                  className='h-6 w-6'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classNamees based on menu state.
    Open: "block", closed: "hidden"
  --> */}
      {isNavOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 sm:px-3'>
            <Link
              href='/'

              // activeClassName='text-white bg-gray-900 hover:bg-gray-900'
            >
              <a className='block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-gray-700 text-gray-300'>
                Home
              </a>
            </Link>
            <Link
              href='/about'

              // activeClassName='text-white bg-gray-900 hover:bg-gray-900'
            >
              <a className='block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-gray-700 text-gray-300'>
                About
              </a>
            </Link>
          </div>
          <div className='pt-4 pb-3 border-t border-gray-700'>
            {isLoggedIn ? (
              <>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <LazyImage
                      width={40}
                      height={40}
                      className='h-10 w-10 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt='Profile picture'
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium leading-none text-white'>
                      {user.name}
                    </div>
                    <div className='mt-1 text-sm font-medium leading-none text-gray-400'>
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className='mt-3 px-2'>
                  <Link href='/profile'>
                    <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'>
                      Your Profile
                    </a>
                  </Link>
                  <a
                    href='/logout'
                    onClick={logout}
                    className='mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                  >
                    Sign out
                  </a>
                </div>
              </>
            ) : (
              <Link href='/login'>
                <a className='block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-gray-700 bg-indigo-500 hover:bg-indigo-600 text-white mt-1 mx-2'>
                  Login
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
