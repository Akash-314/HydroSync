'use client';

import * as React from 'react';
import {
  Inbox,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building,
  GraduationCap,
  Calendar,
  Briefcase,
  Mail,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type StreamType = 'contact' | 'courses' | 'internships' | 'events' | 'institutional' | 'careers' | 'newsletter';

const STREAMS: { id: StreamType; label: string; icon: React.ElementType }[] = [
  { id: 'contact', label: 'Contact Messages', icon: MessageSquare },
  { id: 'courses', label: 'Course Enquiries', icon: GraduationCap },
  { id: 'internships', label: 'Internships', icon: Briefcase },
  { id: 'events', label: 'Event Registrations', icon: Calendar },
  { id: 'institutional', label: 'Institutional MoUs', icon: Building },
  { id: 'careers', label: 'Career Apps', icon: FileText },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
];

export default function AdminSubmissionsPage() {
  const [stream, setStream] = React.useState<StreamType>('contact');
  const [items, setItems] = React.useState<any[]>([]);
  const [counts, setCounts] = React.useState<Record<string, number>>({});
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Selected item modal
  const [selectedItem, setSelectedItem] = React.useState<any | null>(null);
  const [editingNotes, setEditingNotes] = React.useState('');
  const [updating, setUpdating] = React.useState(false);

  const fetchStreamData = React.useCallback(async (st: StreamType, q = '', sf = 'all') => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/submissions', window.location.origin);
      url.searchParams.set('stream', st);
      if (q) url.searchParams.set('q', q);
      if (sf && sf !== 'all') url.searchParams.set('status', sf);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setCounts(data.counts || {});
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchStreamData(stream, search, statusFilter);
  }, [stream, statusFilter, fetchStreamData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStreamData(stream, search, statusFilter);
  };

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stream,
          id: itemId,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((it) => (it.id === itemId ? { ...it, status: newStatus } : it))
        );
        if (selectedItem?.id === itemId) {
          setSelectedItem((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Status update failed');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedItem) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stream,
          id: selectedItem.id,
          admin_notes: editingNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((it) => (it.id === selectedItem.id ? { ...it, admin_notes: editingNotes } : it))
        );
        setSelectedItem((prev: any) => ({ ...prev, admin_notes: editingNotes }));
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Notes update failed');
    } finally {
      setUpdating(false);
    }
  };

  const exportCsv = () => {
    if (!items.length) return;
    const keys = Object.keys(items[0]).filter((k) => typeof items[0][k] !== 'object');
    const headerRow = keys.join(',');
    const dataRows = items.map((it) =>
      keys
        .map((k) => `"${String(it[k] ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );

    const csvContent = [headerRow, ...dataRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${stream}-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Centralized Inbound Portal
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Submission Inbox
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Review, triage, and track responses across all 7 inquiry and application streams.
          </p>
        </div>

        <Button
          onClick={exportCsv}
          disabled={items.length === 0}
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export {stream.toUpperCase()} CSV</span>
        </Button>
      </div>

      {/* Stream Tabs */}
      <div className="flex items-center gap-1.5 border-b border-theme-border pb-3 overflow-x-auto">
        {STREAMS.map((st) => {
          const Icon = st.icon;
          const count = counts[st.id] || 0;
          const isActive = stream === st.id;
          return (
            <button
              key={st.id}
              onClick={() => {
                setStream(st.id);
                setSearch('');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{st.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-theme-bg text-theme-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${stream} by name, email, phone, or keyword...`}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-theme-surface border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="text-xs">
            Search
          </Button>
        </form>

        {stream !== 'newsletter' && stream !== 'events' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-3.5 w-3.5 text-theme-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-theme-surface border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="contacted">Contacted / Responded</option>
              <option value="resolved">Resolved / Closed</option>
            </select>
          </div>
        )}
      </div>

      {/* Submissions Table */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Contact / Applicant</th>
                <th className="py-3 px-4">Inquiry / Subject</th>
                <th className="py-3 px-4">Date Received</th>
                {stream !== 'newsletter' && stream !== 'events' && (
                  <th className="py-3 px-4">Status</th>
                )}
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-theme-muted">
                    Loading inquiries...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-theme-muted">
                    No submissions found matching this criteria.
                  </td>
                </tr>
              ) : (
                items.map((row) => (
                  <tr key={row.id} className="hover:bg-theme-bg/50 transition-colors group">
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-bold text-theme-heading text-xs block">
                          {row.full_name || row.institution_name || row.email || 'Anonymous'}
                        </span>
                        <div className="text-[11px] text-theme-muted">
                          {row.email}
                          {row.phone && <span className="ml-2 font-mono">{row.phone}</span>}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-theme-muted max-w-sm">
                      <div className="truncate">
                        {row.subject ||
                          row.course_name ||
                          row.preferred_domain ||
                          row.event_or_class ||
                          row.role_applied ||
                          row.message ||
                          'General Subscription'}
                      </div>
                      {row.institution_name && row.full_name && (
                        <div className="text-[10px] text-brand-secondary">
                          {row.institution_name}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-theme-muted font-mono text-[11px] whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {stream !== 'newsletter' && stream !== 'events' && (
                      <td className="py-3 px-4">
                        <select
                          value={row.status || 'new'}
                          onChange={(e) => handleStatusChange(row.id, e.target.value)}
                          className="px-2 py-1 rounded-md text-[11px] font-semibold bg-theme-bg border border-theme-border text-theme-heading focus:outline-hidden"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    )}

                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(row);
                          setEditingNotes(row.admin_notes || '');
                        }}
                        className="h-7 px-2.5 text-xs gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Slideover / Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-theme-surface border border-theme-border rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-theme-border">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-secondary font-bold">
                  {stream.toUpperCase()} SUBMISSION
                </span>
                <h3 className="text-lg font-bold font-heading text-theme-heading">
                  {selectedItem.full_name || selectedItem.institution_name || selectedItem.email}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-theme-muted hover:text-theme-heading hover:bg-theme-bg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-theme-bg border border-theme-border font-mono text-[11px]">
                <div>
                  <span className="text-theme-muted block text-[10px]">EMAIL ADDRESS</span>
                  <a href={`mailto:${selectedItem.email}`} className="text-brand-primary hover:underline">
                    {selectedItem.email || '—'}
                  </a>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">PHONE NUMBER</span>
                  <a href={`tel:${selectedItem.phone}`} className="text-theme-heading hover:underline">
                    {selectedItem.phone || '—'}
                  </a>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">DATE RECEIVED</span>
                  <span className="text-theme-heading">
                    {new Date(selectedItem.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">STATUS</span>
                  <span className="font-bold text-brand-secondary">
                    {selectedItem.status || 'Received'}
                  </span>
                </div>
              </div>

              {/* Message / Details */}
              {selectedItem.message && (
                <div>
                  <label className="block text-theme-muted font-bold text-[10px] uppercase tracking-wider mb-1">
                    Submitted Message / Scope
                  </label>
                  <div className="p-3.5 rounded-xl bg-theme-bg border border-theme-border text-theme-heading whitespace-pre-wrap leading-relaxed">
                    {selectedItem.message}
                  </div>
                </div>
              )}

              {/* Any Extra Fields */}
              <div className="space-y-2">
                {Object.entries(selectedItem)
                  .filter(
                    ([k]) =>
                      ![
                        'id',
                        'created_at',
                        'updated_at',
                        'full_name',
                        'email',
                        'phone',
                        'message',
                        'admin_notes',
                        'status',
                      ].includes(k)
                  )
                  .map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between py-1 border-b border-theme-border/60">
                      <span className="text-theme-muted font-mono uppercase text-[10px]">
                        {k.replace(/_/g, ' ')}
                      </span>
                      <span className="font-semibold text-theme-heading max-w-xs text-right">
                        {typeof v === 'object' ? JSON.stringify(v) : String(v || '—')}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Admin Internal Notes */}
              <div>
                <label className="block text-theme-muted font-bold text-[10px] uppercase tracking-wider mb-1">
                  Internal Manager Notes
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record call summaries, follow-up timeline, assigned engineer..."
                  className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    disabled={updating}
                    className="text-xs h-8"
                  >
                    {updating ? 'Saving...' : 'Save Notes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
