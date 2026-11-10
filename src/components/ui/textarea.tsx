import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'flex min-h-[110px] w-full rounded-md border bg-theme-surface dark:bg-brand-dark-surface p-4 text-sm text-theme-heading dark:text-brand-dark-heading placeholder:text-theme-muted dark:placeholder:text-brand-dark-muted transition-colors duration-150',
          'border-theme-border dark:border-brand-dark-border focus:border-brand-secondary dark:focus:border-brand-midnight-yellow focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 dark:focus:ring-brand-midnight-yellow/20',
          'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          error &&
            'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
