import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export interface LogoProps {
  className?: string;
  isCompact?: boolean;
}

export function HydroSyncLogo({ className, isCompact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} - Return to Homepage`}
      className={cn(
        'group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md py-1',
        className
      )}
    >
      {/* Precision Vector Brand Emblem */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary p-0.5 shadow-sm transition-transform duration-200 group-hover:scale-105 dark:from-brand-dark-surface dark:to-brand-dark-elevated dark:border dark:border-brand-dark-blue-accent/30">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white dark:text-brand-dark-blue-accent"
          aria-hidden="true"
        >
          {/* Synchronized Circuit Nodes & Waves */}
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H16C18.2091 8 20 9.79086 20 12V24C20 26.2091 21.7909 28 24 28H28"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 24C28 26.2091 26.2091 28 24 28H20C17.7909 28 16 26.2091 16 24V12C16 9.79086 14.2091 8 12 8H8"
            stroke="#24A5D5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-brand-dark-blue-accent opacity-90"
          />
          {/* Hardware Connection Node Dots */}
          <circle cx="8" cy="12" r="2.2" fill="#159B78" />
          <circle cx="28" cy="24" r="2.2" fill="#159B78" />
          <circle cx="18" cy="18" r="1.8" fill="currentColor" />
        </svg>
      </div>

      {/* Proportional Corporate Wordmark */}
      <div className={cn('flex flex-col', isCompact && 'hidden sm:flex')}>
        <span className="font-heading font-extrabold text-[17px] tracking-tight text-theme-heading leading-tight group-hover:text-brand-secondary transition-colors">
          Hydro<span className="text-brand-secondary dark:text-brand-dark-blue-accent">Sync</span>
        </span>
        <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-theme-muted group-hover:text-theme-heading transition-colors leading-none mt-0.5">
          Innovations LLP
        </span>
      </div>
    </Link>
  );
}

