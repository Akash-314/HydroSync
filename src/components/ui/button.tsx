import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'cta' | 'blue';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent dark:focus-visible:ring-brand-midnight-yellow focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      // BLUE BUTTON (#003F88 -> Hover #00509D)
      primary:
        'bg-brand-primary text-white hover:bg-brand-secondary active:scale-[0.99] dark:bg-brand-midnight-french dark:text-white dark:hover:bg-brand-midnight-azure dark:border-none shadow-sm',
      blue:
        'bg-brand-primary text-white hover:bg-brand-secondary active:scale-[0.99] dark:bg-brand-midnight-french dark:text-white dark:hover:bg-brand-midnight-azure dark:border-none shadow-sm',
      // PRIMARY CTA (#FDC500 -> Hover #FFD500, Text #101820)
      cta:
        'bg-brand-primary text-white hover:bg-brand-secondary active:scale-[0.99] dark:bg-brand-midnight-yellow dark:text-[#101820] dark:hover:bg-brand-midnight-gold dark:border-none font-bold shadow-sm',
      // SECONDARY BUTTON (Transparent background, Border #244365, Text #E5EDF7, Hover #122D50)
      secondary:
        'bg-theme-surface text-brand-primary border border-theme-border hover:bg-brand-light-bg dark:bg-transparent dark:border-brand-dark-border dark:text-[#E5EDF7] dark:hover:bg-brand-dark-elevated shadow-sm',
      outline:
        'bg-transparent text-brand-innovation-green border border-brand-innovation-green hover:bg-brand-innovation-green/10 dark:bg-transparent dark:border-brand-dark-border dark:text-[#E5EDF7] dark:hover:bg-brand-dark-elevated',
      ghost:
        'bg-transparent text-theme-heading hover:bg-theme-surface hover:text-brand-secondary dark:text-brand-dark-heading dark:hover:bg-brand-dark-elevated dark:hover:text-brand-midnight-yellow',
      link:
        'bg-transparent text-brand-secondary underline-offset-4 hover:underline p-0 h-auto font-medium dark:text-brand-midnight-azure dark:hover:text-brand-midnight-gold',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0',
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      variant !== 'link' && sizes[size],
      className
    );

    if (href) {
      return (
        <Link href={href} prefetch={true} className={combinedClassName}>
          {isLoading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          )}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
