import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-[1.18] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-theme-body dark:text-brand-dark-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
