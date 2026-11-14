import * as React from 'react';
import { notFound } from 'next/navigation';
import { CourseEditor } from '@/components/admin/course-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import { COURSES_DATA as fallbackCourses } from '@/data/courses';
import type { CourseRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchCourseById(id: string): Promise<CourseRow | null> {
  const getFallback = () => {
    const fb = fallbackCourses.find((c) => c.id === id);
    if (!fb) return null;
    return {
      id: fb.id,
      slug: fb.id,
      title: fb.title,
      category: 'Embedded Systems' as CourseRow['category'],
      level: 'All Levels' as CourseRow['level'],
      duration_weeks: 6,
      learning_mode: 'Hybrid' as CourseRow['learning_mode'],
      price_inr: 4999,
      short_description: fb.shortDescription,
      overview: fb.shortDescription,
      syllabus: [],
      prerequisites: [fb.prerequisites],
      hardware_kit_included: fb.hardwareKitIncluded,
      hardware_tools: [],
      featured: !!fb.featured,
      is_published: true,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: null,
    };
  };

  const client = getActiveServerClient();
  if (!client) {
    return getFallback();
  }

  try {
    const { data } = await client
      .from('courses')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (data) return data as CourseRow;
  } catch {
    // fallback
  }

  return getFallback();
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await fetchCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
          Course Catalog
        </span>
        <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
          Edit Course: {course.title}
        </h1>
        <p className="text-xs text-theme-muted mt-1">
          Update curriculum modules, prerequisites, pricing, and publication status.
        </p>
      </div>

      <CourseEditor initialCourse={course} />
    </div>
  );
}
