import * as React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestimonialItem } from '@/types';

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = testimonial.rating || 5;

  return (
    <Card hoverable className="h-full flex flex-col justify-between">
      <CardContent className="p-6 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <Badge variant="neutral">{testimonial.category}</Badge>
          </div>

          <div className="relative">
            <Quote className="h-6 w-6 text-brand-secondary/20 mb-2 rotate-180" />
            <p className="text-sm text-theme-body leading-relaxed italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-theme-border/60">
          <p className="text-sm font-bold font-heading text-theme-heading">
            {testimonial.author}
          </p>
          <p className="text-xs text-theme-muted mt-0.5">
            {testimonial.role}, {testimonial.organization}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

