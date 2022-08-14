import clsx from 'clsx';
import { createElement, forwardRef } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  secondary?: boolean;
  as?: React.ElementType;
  full?: boolean;
}

const Button = forwardRef(
  (
    {
      loading,
      children,
      secondary,
      as = 'button',
      full = false,
      className,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const styles = clsx(
      'py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer',
      {
        primary:
          'text-white bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-500 active:bg-indigo-500',
        secondary:
          'text-indigo-900 bg-indigo-200 hover:bg-indigo-300 focus:bg-indigo-100 active:bg-indigo-100',
      }[secondary ? 'secondary' : 'primary'],
      full && 'w-full flex justify-center',
      className,
    );

    const element = createElement(as, {
      className: styles,
      ref,
      children: loading ? <Spinner /> : children,
      disabled: loading,
      type: as === 'button' ? 'submit' : undefined,
      ...props,
    });

    return element;
  },
);

export default Button;
