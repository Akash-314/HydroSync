import * as React from 'react';
import { notFound } from 'next/navigation';
import { ProjectEditor } from '@/components/admin/project-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { ProjectRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchProject(id: string): Promise<ProjectRow | null> {
  const client = getActiveServerClient();
  if (!client) return null;

  try {
    const { data } = await client
      .from('projects')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    return data as ProjectRow | null;
  } catch {
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectEditor initialProject={project} isNew={false} />;
}
