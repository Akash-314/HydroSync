import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseItem } from '@/types';

export interface CourseCardProps {
  course: CourseItem;
  onApply?: () => void;
}

export function CourseCard({ course, onApply }: CourseCardProps) {
  return (
    <Card hoverable className="h-full flex flex-col border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface">
      <CardHeader className="space-y-3">
        {/* Category & Duration Pill */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={
              course.category === 'IoT'
                ? 'iot'
                : course.category === 'AI'
                ? 'ai'
                : 'embedded'
            }
          >
            {course.category}
          </Badge>
          <span className="font-mono text-xs font-semibold text-theme-muted dark:text-brand-dark-muted tracking-tight">
            {course.duration}
          </span>
        </div>

        <CardTitle className="text-xl sm:text-[22px] font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-snug">
          {course.title}
        </CardTitle>

        <CardDescription className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed line-clamp-2">
          {course.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Structured Spec Strip */}
        <div className="flex items-center justify-between text-xs py-2.5 px-3 rounded-lg bg-theme-bg dark:bg-brand-dark-elevated border border-theme-border/60 dark:border-brand-dark-border/60">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted">Level</span>
            <span className="font-semibold text-theme-heading dark:text-brand-dark-heading mt-0.5">{course.level}</span>
          </div>
          <div className="h-6 w-px bg-theme-border/80 dark:bg-brand-dark-border" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted">Mode</span>
            <span className="font-semibold text-brand-secondary dark:text-brand-midnight-azure mt-0.5">{course.mode}</span>
          </div>
          <div className="h-6 w-px bg-theme-border/80 dark:bg-brand-dark-border" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted">Hardware</span>
            <span className="font-semibold text-brand-innovation-green mt-0.5">
              {course.hardwareKitIncluded ? 'Kit Included' : 'Lab Station'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-3 pt-4 border-t border-theme-border/60 dark:border-brand-dark-border/60">
        <Button
          variant="secondary"
          size="sm"
          href={course.href || `/courses`}
          className="w-1/2 text-xs font-semibold"
        >
          View Syllabus
        </Button>
        <Button
          variant="cta"
          size="sm"
          href={`/apply?program=${encodeURIComponent(course.title)}`}
          className="w-1/2 text-xs font-semibold"
          onClick={onApply}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
