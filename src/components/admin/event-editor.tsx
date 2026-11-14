'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle, Download, Users, Calendar, MapPin, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { EventRow, EventRegistrationRow } from '@/lib/supabase/types';

export function EventEditor({
  initialEvent,
  initialRegistrations = [],
  isNew = false,
}: {
  initialEvent?: Partial<EventRow> | null;
  initialRegistrations?: EventRegistrationRow[];
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [title, setTitle] = React.useState(initialEvent?.title || '');
  const [slug, setSlug] = React.useState(initialEvent?.slug || '');
  const [eventType, setEventType] = React.useState<EventRow['event_type']>(initialEvent?.event_type || 'Workshop');
  const [startDate, setStartDate] = React.useState(
    initialEvent?.start_date ? new Date(initialEvent.start_date).toISOString().slice(0, 16) : ''
  );
  const [endDate, setEndDate] = React.useState(
    initialEvent?.end_date ? new Date(initialEvent.end_date).toISOString().slice(0, 16) : ''
  );
  const [venue, setVenue] = React.useState(initialEvent?.venue || 'HydroSync IoT Lab, Ground Floor / Virtual Studio');
  const [mode, setMode] = React.useState<EventRow['mode']>(initialEvent?.mode || 'Hybrid');
  const [speakerName, setSpeakerName] = React.useState(initialEvent?.speaker_name || '');
  const [speakerTitle, setSpeakerTitle] = React.useState(initialEvent?.speaker_title || '');
  const [description, setDescription] = React.useState(initialEvent?.description || '');
  const [maxSeats, setMaxSeats] = React.useState(initialEvent?.max_seats || 50);
  const [isOpen, setIsOpen] = React.useState(initialEvent?.is_open ?? true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      event_type: eventType,
      start_date: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
      end_date: endDate ? new Date(endDate).toISOString() : null,
      venue,
      mode,
      speaker_name: speakerName || null,
      speaker_title: speakerTitle || null,
      description,
      max_seats: Number(maxSeats),
      is_open: isOpen,
    };

    try {
      const url = isNew ? '/api/admin/events' : `/api/admin/events/${initialEvent?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save event');
      }

      setMessage({ text: isNew ? 'Event published successfully!' : 'Event updated successfully!', type: 'success' });
      if (isNew && data.event?.id) {
        router.push(`/admin/events/${data.event.id}`);
      } else {
        router.refresh();
      }
    } catch (err: unknown) {
      setMessage({ text: err instanceof Error ? err.message : 'Save error', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialEvent?.id) return;
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events/${initialEvent.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete event');
      }
      router.push('/admin/events');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setLoading(false);
    }
  };

  const exportRegistrationsCsv = () => {
    if (!initialRegistrations.length) return;
    const headers = ['Full Name', 'Email', 'Phone', 'College', 'Session Type', 'Registered At'];
    const rows = initialRegistrations.map((r) => [
      `"${(r.full_name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.college || '').replace(/"/g, '""')}"`,
      `"${(r.session_type || '').replace(/"/g, '""')}"`,
      `"${r.created_at}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${slug}-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <Link href="/admin/events">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
              {isNew ? 'Publish Event' : 'Edit Event'}
            </span>
            <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
              {isNew ? 'Create New Workshop / Masterclass' : title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <Button variant="outline" onClick={handleDelete} disabled={loading} className="gap-2 text-xs text-red-500 hover:text-red-600 hover:border-red-500/30">
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          )}
          <Button onClick={handleSave} disabled={loading} className="gap-2 text-xs">
            <Save className="h-3.5 w-3.5" />
            <span>{loading ? 'Saving...' : 'Save & Publish'}</span>
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Event Details &amp; Agenda
            </h2>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Hands-On STM32 FreeRTOS Boot Camp"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="hands-on-stm32-freertos-bootcamp"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Event Format / Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventRow['event_type'])}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Masterclass">Masterclass</option>
                  <option value="Bootcamp">Bootcamp</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Delivery Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as EventRow['mode'])}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                >
                  <option value="Hybrid">Hybrid (Lab + Online)</option>
                  <option value="In-Person">In-Person Only</option>
                  <option value="Online">Online Only (Webinar/Live Stream)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Physical / Virtual Venue
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="HydroSync IoT Lab / Zoom Conference Room"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Start Date &amp; Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  End Date &amp; Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Full Description &amp; What Attendees Will Learn
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive overview of topics covered, prerequisites, hardware kits provided, schedule outline..."
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Keynote Speaker / Lead Instructor
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Speaker Full Name
                </label>
                <input
                  type="text"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  placeholder="e.g. Er. Ankit Varma"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Speaker Designation / Credentials
                </label>
                <input
                  type="text"
                  value={speakerTitle}
                  onChange={(e) => setSpeakerTitle(e.target.value)}
                  placeholder="Lead Embedded Architect, HydroSync"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Registered Participants Section */}
          {!isNew && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-theme-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-secondary" />
                  <h2 className="text-sm font-bold text-theme-heading">
                    Registered Attendees ({initialRegistrations.length})
                  </h2>
                </div>
                {initialRegistrations.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={exportRegistrationsCsv}
                    className="gap-1.5 text-xs h-8"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </Button>
                )}
              </div>

              {initialRegistrations.length === 0 ? (
                <p className="text-xs text-theme-muted py-6 text-center">
                  No registrations recorded yet for this event.
                </p>
              ) : (
                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px] sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Attendee</th>
                        <th className="py-2.5 px-3">Contact</th>
                        <th className="py-2.5 px-3">College / Dept</th>
                        <th className="py-2.5 px-3">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-theme-border/60">
                      {initialRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-theme-bg/50">
                          <td className="py-2.5 px-3 font-semibold text-theme-heading">
                            {reg.full_name}
                          </td>
                          <td className="py-2.5 px-3 text-theme-muted">
                            <div>{reg.email}</div>
                            <div className="text-[11px] font-mono">{reg.phone}</div>
                          </td>
                          <td className="py-2.5 px-3 text-theme-muted">
                            <div>{reg.college || '—'}</div>
                            <div className="text-[10px]">{reg.session_type || ''}</div>
                          </td>
                          <td className="py-2.5 px-3 text-theme-muted text-[11px] font-mono">
                            {new Date(reg.created_at).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h3 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Registration Status &amp; Capacity
            </h3>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Maximum Attendee Capacity
              </label>
              <input
                type="number"
                min={1}
                value={maxSeats}
                onChange={(e) => setMaxSeats(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Total seats open across all lab hardware testbenches.
              </span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-theme-border bg-theme-bg/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={(e) => setIsOpen(e.target.checked)}
                  className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <div>
                  <span className="text-xs font-semibold text-theme-heading block">
                    Registrations Open
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    If unchecked, registrations are closed on public site.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
