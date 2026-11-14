import * as React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  PlusCircle,
  Search,
  Edit3,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  IndianRupee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import { COURSES_DATA as fallbackCourses } from '@/data/courses';
import type { CourseRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminCourses(): Promise<CourseRow[]> {
  const mapFallback = () =>
    fallbackCourses.map((c, i) => ({
      id: c.id,
      slug: c.id,
      title: c.title,
      category: 'Embedded Systems' as CourseRow['category'],
      level: 'All Levels' as CourseRow['level'],
      duration_weeks: 6,
      learning_mode: 'Hybrid' as CourseRow['learning_mode'],
      price_inr: 4999,
      short_description: c.shortDescription,
      overview: c.shortDescription,
      syllabus: [],
      prerequisites: [c.prerequisites],
      hardware_kit_included: c.hardwareKitIncluded,
      hardware_tools: [],
      featured: !!c.featured,
      is_published: true,
      display_order: i + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: null,
    }));

  const client = getActiveServerClient();
  if (!client) {
    return mapFallback();
  }

  try {
    const { data } = await client
      .from('courses')
      .select('*')
      .order('display_order', { ascending: true });

    if (data && data.length > 0) {
      return data as CourseRow[];
    }
  } catch {
    // Fallback if unmigrated
  }

  return mapFallback();
}

export default async function AdminCoursesPage() {
  const courses = await fetchAdminCourses();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Curriculum Administration
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Course Management ({courses.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Create, edit syllabi, set learning fees, and configure enrollment batches.
          </p>
        </div>

        <Link href="/admin/courses/new">
          <Button className="gap-2 text-xs">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Course</span>
          </Button>
        </Link>
      </div>

      {/* Courses Table / List */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Course Title &amp; Category</th>
                <th className="py-3 px-4">Level &amp; Duration</th>
                <th className="py-3 px-4">Learning Mode</th>
                <th className="py-3 px-4">Fee (INR)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {courses.map((course) => (
                <tr
                  key={course.id || course.slug}
                  className="hover:bg-theme-bg/50 transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors block">
                          {course.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-brand-light-bg text-brand-secondary border border-brand-secondary/20">
                            {course.category}
                          </span>
                          <span className="font-mono text-[10px] text-theme-muted">
                            /{course.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-theme-muted">
                    <div className="flex flex-col">
                      <span className="font-semibold text-theme-heading">{course.level}</span>
                      <span className="text-[11px]">{course.duration_weeks} Weeks Curriculum</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-theme-muted">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-theme-bg border border-theme-border">
                      {course.learning_mode}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-theme-heading font-mono">
                    ₹{Number(course.price_inr).toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    {course.is_published ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Clock className="h-3 w-3" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/courses/${course.slug}`} target="_blank">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-theme-muted hover:text-theme-heading"
                          title="Preview on Public Site"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>

                      <Link href={`/admin/courses/${course.id || course.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs h-8"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit &amp; Batches</span>
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
