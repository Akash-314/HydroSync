import * as React from 'react';
import { notFound } from 'next/navigation';
import { InternshipEditor } from '@/components/admin/internship-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import { INTERNSHIP_PROGRAMS as fallbackPrograms } from '@/data/internships';
import type { InternshipProgramRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchProgramById(id: string): Promise<InternshipProgramRow | null> {
  const getFallback = () => {
    const fb = fallbackPrograms.find((p) => p.id === id);
    if (!fb) return null;
    return {
      id: fb.id,
      slug: fb.id,
      title: fb.title,
      domain: fb.domain,
      duration: fb.durations[0] || '6 Weeks',
      mode: 'Hybrid' as InternshipProgramRow['mode'],
      short_description: fb.summary,
      eligibility: fb.eligibility.join(', '),
      learning_outcomes: fb.skillsGained,
      hardware_exposure: [fb.hardwareKit],
      seats_available: 30,
      is_active: true,
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
      .from('internship_programs')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (data) return data as InternshipProgramRow;
  } catch {
    // fallback
  }

  return getFallback();
}

export default async function EditInternshipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchProgramById(id);

  if (!program) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
          Nexonix Reflexo Internship System
        </span>
        <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
          Edit Program: {program.title}
        </h1>
        <p className="text-xs text-theme-muted mt-1">
          Update specialization track, domain requirements, and candidate intake quotas.
        </p>
      </div>

      <InternshipEditor initialProgram={program} />
    </div>
  );
}
