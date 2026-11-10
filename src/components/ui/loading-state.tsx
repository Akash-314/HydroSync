import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Loading technical data...',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-xl border border-theme-border bg-theme-surface/50',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-brand-secondary dark:text-brand-dark-blue-accent mb-3" />
      <p className="text-sm font-medium text-theme-muted">{message}</p>
    </div>
  );
}

