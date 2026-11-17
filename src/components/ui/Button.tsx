import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold ring-offset-white transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none shadow-2xs cursor-pointer';

    const variantStyles = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm dark:bg-blue-600 dark:hover:bg-blue-500',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-sm dark:bg-rose-700 dark:hover:bg-rose-600',
      outline:
        'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100',
      secondary:
        'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
      ghost:
        'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 shadow-none',
      link: 'text-blue-600 underline-offset-4 hover:underline shadow-none dark:text-blue-400'
    };

    const sizeStyles = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-lg px-3 text-[11px]',
      lg: 'h-10 rounded-xl px-5 text-sm',
      icon: 'h-9 w-9 p-0'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
