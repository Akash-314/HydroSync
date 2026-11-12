import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export interface LogoProps {
  className?: string;
  isCompact?: boolean;
  showTagline?: boolean;
}

export function HydroSyncLogo({
  className,
  isCompact = false,
  showTagline = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} - Return to Homepage`}
      className={cn(
        'group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md py-1',
        className
      )}
    >
      {/* Official HydroSync "H" Emblem (Transparent PNG) */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 dark:bg-brand-dark-surface/80 p-0.5 border border-theme-border/40 dark:border-brand-dark-border/60 shadow-sm transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/images/logo/hydrosync-logo-mark.png"
          alt="HydroSync Innovations LLP Official Logo Mark"
          width={40}
          height={40}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {/* Proportional Corporate Wordmark */}
      <div className={cn('flex flex-col', isCompact && 'hidden sm:flex')}>
        <span className="font-heading font-extrabold text-[17px] tracking-tight text-theme-heading leading-tight group-hover:text-brand-secondary transition-colors">
          Hydro<span className="text-brand-secondary dark:text-brand-dark-blue-accent">Sync</span>
        </span>
        <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-theme-muted group-hover:text-theme-heading transition-colors leading-none mt-0.5">
          Innovations LLP
        </span>
        {showTagline && (
          <span className="text-[8px] font-medium tracking-wider text-theme-muted/80 uppercase mt-0.5">
            Innovation for a Healthier Tomorrow
          </span>
        )}
      </div>
    </Link>
  );
}

export function HydroSyncFullLogoImage({
  className,
  width = 240,
  height = 80,
  priority = false,
}: {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div className={cn('relative inline-block', className)}>
      {/* Light mode logo */}
      <Image
        src="/images/logo/hydrosync-logo.png"
        alt="HydroSync Innovations LLP Official Logo"
        width={width}
        height={height}
        className="block dark:hidden h-auto w-auto object-contain"
        priority={priority}
      />
      {/* Dark mode logo */}
      <Image
        src="/images/logo/hydrosync-logo-dark.png"
        alt="HydroSync Innovations LLP Official Logo"
        width={width}
        height={height}
        className="hidden dark:block h-auto w-auto object-contain"
        priority={priority}
      />
    </div>
  );
}


