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
        'relative border-b border-theme-border bg-theme-surface py-12 md:py-16 transition-colors',
        className
      )}
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-dark-blue-accent mb-2">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-theme-heading leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-theme-body leading-relaxed">
              {subtitle}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}

