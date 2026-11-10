'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border border-theme-border rounded-lg bg-theme-surface overflow-hidden transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-semibold text-theme-heading hover:text-brand-secondary transition-colors"
      >
        <span className="text-base md:text-lg">{title}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-theme-muted transition-transform duration-200',
            isOpen && 'rotate-180 text-brand-secondary'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-theme-body leading-relaxed border-t border-theme-border/60">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('space-y-3 w-full', className)}>{children}</div>;
}

