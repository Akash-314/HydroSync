import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectItem } from '@/types';

export interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hoverable className="h-full">
      {/* Visual Header / Diagram placeholder */}
      <div className="relative aspect-[16/10] w-full bg-theme-bg border-b border-theme-border/60 flex items-center justify-center p-6 text-theme-muted overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-10 w-10 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-2">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="text-xs font-mono font-medium tracking-tight">
            {project.scope}
          </span>
        </div>
        {project.impactMetric && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-primary text-white dark:bg-brand-dark-blue-accent dark:text-brand-dark-bg">
              {project.impactMetric}
            </span>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="iot">{project.category}</Badge>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-theme-bg text-theme-muted border border-theme-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      {project.href && (
        <CardFooter>
          <Link
            href={project.href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary hover:text-brand-primary dark:hover:text-brand-dark-blue-accent transition-colors"
          >
            <span>View Case Study Architecture</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

