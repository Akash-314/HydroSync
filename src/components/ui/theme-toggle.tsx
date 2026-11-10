'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-10 w-10 rounded-md border border-theme-border dark:border-brand-dark-border bg-theme-surface/50 dark:bg-brand-dark-surface/50',
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-theme-heading dark:text-brand-dark-heading transition-colors hover:bg-brand-light-bg dark:hover:bg-brand-dark-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent dark:focus-visible:ring-brand-midnight-yellow',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-brand-midnight-yellow transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-brand-primary transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
