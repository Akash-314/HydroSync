import * as React from 'react';
import { notFound } from 'next/navigation';
import { EventEditor } from '@/components/admin/event-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { EventRow, EventRegistrationRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchEventData(id: string): Promise<{ event: EventRow; registrations: EventRegistrationRow[] } | null> {
  const client = getActiveServerClient();
  if (!client) return null;

  try {
    const { data: event, error } = await client
      .from('events')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !event) return null;

    const { data: registrations } = await client
      .from('event_registrations')
      .select('*')
      .or(`event_or_class.eq.${event.title},event_or_class.eq.${event.slug}`)
      .order('created_at', { ascending: false });

    return {
      event: event as EventRow,
      registrations: (registrations || []) as EventRegistrationRow[],
    };
  } catch {
    return null;
  }
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEventData(id);

  if (!data) {
    notFound();
  }

  return (
    <EventEditor
      initialEvent={data.event}
      initialRegistrations={data.registrations}
      isNew={false}
    />
  );
}
