import * as React from 'react';
import { CourseEditor } from '@/components/admin/course-editor';

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
          Course Catalog
        </span>
        <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
          Create New Course
        </h1>
        <p className="text-xs text-theme-muted mt-1">
          Configure a new technical program with syllabus modules, prerequisites, and learning fee.
        </p>
      </div>

      <CourseEditor isNew />
    </div>
  );
}

