import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'iot' | 'embedded' | 'ai' | 'success' | 'warning' | 'neutral' | 'highlight';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20 dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure dark:border-brand-midnight-azure/40',
    iot:
      'bg-brand-secondary/15 text-brand-primary dark:bg-brand-midnight-azure/25 dark:text-brand-dark-heading dark:border-brand-midnight-azure/40',
    embedded:
      'bg-brand-primary/10 text-brand-primary dark:bg-brand-midnight-french/30 dark:text-brand-dark-heading dark:border-brand-midnight-french/50',
    ai:
      'bg-brand-accent/15 text-brand-secondary dark:bg-brand-midnight-imperial/40 dark:text-brand-dark-heading dark:border-brand-midnight-azure/40',
    highlight:
      'bg-brand-midnight-yellow/15 text-[#101820] border-brand-midnight-yellow/40 dark:bg-brand-midnight-yellow/20 dark:text-brand-midnight-yellow dark:border-brand-midnight-yellow/50',
    success:
      'bg-brand-innovation-green/10 text-brand-innovation-green border-brand-innovation-green/20 dark:bg-brand-innovation-green/15 dark:text-brand-innovation-green dark:border-brand-innovation-green/30',
    warning:
      'bg-amber-500/10 text-amber-700 dark:bg-brand-midnight-yellow/15 dark:text-brand-midnight-yellow border-amber-500/20 dark:border-brand-midnight-yellow/30',
    neutral:
      'bg-theme-bg text-theme-muted border-theme-border dark:bg-brand-dark-surface dark:text-brand-dark-muted dark:border-brand-dark-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border select-none transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
