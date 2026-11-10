import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Unable to complete this operation. Please verify your connection and try again.',
  retryLabel = 'Try Again',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-red-500/20 bg-red-500/5 max-w-lg mx-auto',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400 mb-4">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold font-heading text-theme-heading">
        {title}
      </h3>
      <p className="mt-2 text-sm text-theme-body leading-relaxed max-w-sm">
        {message}
      </p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} size="sm" variant="secondary">
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

