import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceItem } from '@/types';

export interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card hoverable className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={service.category === 'IoT' ? 'iot' : service.category === 'AI' ? 'ai' : 'embedded'}>
            {service.category}
          </Badge>
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {service.deliverables && service.deliverables.length > 0 && (
          <ul className="space-y-2 mt-2 text-xs text-theme-body dark:text-brand-dark-body">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-innovation-green mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {service.href && (
        <CardFooter>
          <Link
            href={service.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:text-brand-primary dark:text-brand-midnight-azure dark:hover:text-brand-midnight-gold transition-colors"
          >
            <span>Explore Technical Specs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
