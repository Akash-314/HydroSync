import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceItem } from '@/types';

export interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card hoverable className="h-full flex flex-col border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={service.category === 'IoT' ? 'iot' : service.category === 'AI' ? 'ai' : 'embedded'}>
            {service.category}
          </Badge>
        </div>
        <CardTitle className="text-xl sm:text-[22px] font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-snug">
          {service.title}
        </CardTitle>
        <CardDescription className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="pt-2 border-t border-theme-border/60 dark:border-brand-dark-border/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block mb-2">
              Deliverables &amp; Artifacts
            </span>
            <ul className="space-y-2 text-xs text-theme-body dark:text-brand-dark-body">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary dark:bg-brand-midnight-azure mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      {service.href && (
        <CardFooter className="pt-4 border-t border-theme-border/60 dark:border-brand-dark-border/60">
          <Link
            href={service.href}
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:text-brand-primary dark:text-brand-midnight-azure dark:hover:text-brand-midnight-gold transition-colors"
          >
            <span>Explore Technical Specs</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
