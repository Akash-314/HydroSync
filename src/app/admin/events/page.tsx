import * as React from 'react';
import Link from 'next/link';
import { Calendar, PlusCircle, Edit3, Eye, CheckCircle2, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { EventRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminEvents(): Promise<EventRow[]> {
  const client = getActiveServerClient();
  if (!client) return [];

  try {
    const { data } = await client
      .from('events')
      .select('*')
      .order('start_date', { ascending: false });

    return (data || []) as EventRow[];
  } catch {
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await fetchAdminEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Live Workshops &amp; Masterclasses
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Event Management ({events.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Publish technical bootcamps, workshops, speaker profiles, and track attendee seat limits.
          </p>
        </div>

        <Link href="/admin/events/new">
          <Button className="gap-2 text-xs">
            <PlusCircle className="h-4 w-4" />
            <span>Publish New Event</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Event Title &amp; Type</th>
                <th className="py-3 px-4">Date &amp; Schedule</th>
                <th className="py-3 px-4">Venue / Mode</th>
                <th className="py-3 px-4">Seat Capacity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-theme-muted">
                    No workshops or events recorded in database. Click &ldquo;Publish New Event&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-theme-bg/50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors block">
                          {event.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                            {event.event_type}
                          </span>
                          {event.speaker_name && (
                            <span className="text-[11px] text-theme-muted">
                              Speaker: {event.speaker_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      <span className="font-semibold text-theme-heading block">
                        {new Date(event.start_date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-theme-bg border border-theme-border">
                        {event.mode}
                      </span>
                      <span className="block text-[10px] text-theme-muted mt-0.5 truncate max-w-[150px]">
                        {event.venue}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-theme-heading">
                      {event.registered_count} / {event.max_seats} Seats
                    </td>

                    <td className="py-3.5 px-4">
                      {event.is_open ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Open</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          <Clock className="h-3 w-3" />
                          <span>Closed</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/admin/events/${event.id}`}>
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Manage</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
