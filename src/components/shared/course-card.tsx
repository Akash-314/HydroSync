import * as React from 'react';
import { Clock, Cpu, Layers } from 'lucide-react';
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
    <Card hoverable className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
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
          <span className="flex items-center gap-1 text-xs text-theme-muted font-medium">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.summary}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs text-theme-body pt-2 border-t border-theme-border/60">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-brand-secondary" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-innovation-green" />
            <span>{course.mode}</span>
          </div>
        </div>

        {course.hardwareKitIncluded && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-brand-primary dark:text-brand-dark-blue-accent bg-brand-light-bg dark:bg-brand-dark-surface p-2 rounded-md border border-theme-border/60">
            <Cpu className="h-3.5 w-3.5 shrink-0 text-brand-secondary" />
            <span>Hands-on Hardware Kit Included</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="secondary"
          size="sm"
          href={course.href || `/courses`}
          className="w-1/2 text-xs"
        >
          View Syllabus
        </Button>
        <Button
          variant="primary"
          size="sm"
          href={`/apply?program=${encodeURIComponent(course.title)}`}
          className="w-1/2 text-xs"
          onClick={onApply}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

