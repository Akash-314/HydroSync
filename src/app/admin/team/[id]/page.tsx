import * as React from 'react';
import { notFound } from 'next/navigation';
import { TeamEditor } from '@/components/admin/team-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { TeamMemberRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchTeamMember(id: string): Promise<TeamMemberRow | null> {
  const client = getActiveServerClient();
  if (!client) return null;

  try {
    const { data } = await client
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    return data as TeamMemberRow | null;
  } catch {
    return null;
  }
}

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await fetchTeamMember(id);

  if (!member) {
    notFound();
  }

  return <TeamEditor initialMember={member} isNew={false} />;
}

