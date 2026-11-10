import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'iot' | 'embedded' | 'ai' | 'success' | 'warning' | 'neutral';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20 dark:bg-brand-dark-blue-accent/15 dark:text-brand-dark-blue-accent',
    iot: 'bg-brand-secondary/15 text-brand-primary dark:bg-brand-dark-blue-accent/20 dark:text-brand-dark-blue-accent border-brand-secondary/30',
    embedded:
      'bg-brand-primary/10 text-brand-primary dark:bg-brand-dark-blue-accent/15 dark:text-brand-dark-heading border-brand-primary/20',
    ai: 'bg-brand-accent/15 text-brand-secondary dark:bg-brand-accent/25 dark:text-brand-dark-blue-accent border-brand-accent/30',
    success:
      'bg-brand-innovation-green/10 text-brand-innovation-green border-brand-innovation-green/20 dark:bg-brand-dark-green-accent/15 dark:text-brand-dark-green-accent',
    warning:
      'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    neutral:
      'bg-theme-bg text-theme-muted border-theme-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

