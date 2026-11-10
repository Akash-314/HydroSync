import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-theme-border bg-theme-surface/50 max-w-lg mx-auto',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg text-brand-secondary dark:bg-brand-dark-surface dark:text-brand-dark-blue-accent mb-4">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-bold font-heading text-theme-heading">
        {title}
      </h3>
      <p className="mt-2 text-sm text-theme-body leading-relaxed max-w-sm">
        {description}
      </p>
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-6">
          {actionHref ? (
            <Button href={actionHref} size="sm" variant="secondary">
              {actionLabel}
            </Button>
          ) : (
            <Button onClick={onAction} size="sm" variant="secondary">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

