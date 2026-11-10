import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevated?: boolean;
}

export function Card({
  className,
  hoverable = false,
  elevated = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-theme-border dark:border-brand-dark-border shadow-sm overflow-hidden flex flex-col transition-colors',
        elevated
          ? 'bg-theme-elevated dark:bg-brand-dark-elevated text-theme-body dark:text-brand-dark-body'
          : 'bg-theme-surface dark:bg-brand-dark-surface text-theme-body dark:text-brand-dark-body',
        hoverable &&
          'transition-all duration-200 hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-3 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  as: Component = 'h3',
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn(
        'text-lg md:text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-tight tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-theme-body dark:text-brand-dark-body leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0 flex-1', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'p-6 pt-0 mt-auto flex items-center justify-between border-t border-theme-border/60 dark:border-brand-dark-border/60 pt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
