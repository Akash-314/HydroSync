import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md border bg-theme-surface dark:bg-brand-dark-surface px-4 py-2 text-sm text-theme-heading dark:text-brand-dark-heading placeholder:text-theme-muted dark:placeholder:text-brand-dark-muted transition-colors duration-150',
          'border-theme-border dark:border-brand-dark-border focus:border-brand-secondary dark:focus:border-brand-midnight-yellow focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 dark:focus:ring-brand-midnight-yellow/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error &&
            'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
