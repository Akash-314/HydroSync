import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { BreadcrumbItem } from '@/types';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  actions,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg py-16 md:py-24 transition-colors',
        className
      )}
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-4xl">
          {eyebrow && (
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure mb-3.5">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold font-heading text-theme-heading dark:text-brand-dark-heading leading-[1.12] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-theme-body dark:text-brand-dark-body leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}
