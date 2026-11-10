import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            'flex h-11 w-full appearance-none rounded-md border bg-theme-surface dark:bg-brand-dark-surface px-4 py-2 pr-10 text-sm text-theme-heading dark:text-brand-dark-heading transition-colors duration-150',
            'border-theme-border dark:border-brand-dark-border focus:border-brand-secondary dark:focus:border-brand-midnight-yellow focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 dark:focus:ring-brand-midnight-yellow/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted dark:text-brand-dark-muted" />
      </div>
    );
  }
);

Select.displayName = 'Select';
