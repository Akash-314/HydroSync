'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Users2,
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InternshipApplicationRow } from '@/lib/supabase/types';

const PIPELINE_STAGES = [
  { key: 'all', label: 'All Candidates' },
  { key: 'pending', label: 'New / Pending', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { key: 'under_review', label: 'Under Review', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  { key: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  { key: 'accepted', label: 'Selected / Accepted', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { key: 'rejected', label: 'Rejected', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
];

export default function InternshipApplicationsPipelinePage() {
  const [applications, setApplications] = React.useState<InternshipApplicationRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedStage, setSelectedStage] = React.useState('all');
  const [selectedApp, setSelectedApp] = React.useState<InternshipApplicationRow | null>(null);
  const [updatingStatus, setUpdatingStatus] = React.useState(false);
  const [internalNotes, setInternalNotes] = React.useState('');
  const [signedResumeUrl, setSignedResumeUrl] = React.useState<string | null>(null);
  const [resumeLoading, setResumeLoading] = React.useState(false);

  const fetchApplications = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStage !== 'all') params.set('status', selectedStage);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/internships/applications?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedStage, search]);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleOpenModal = async (app: InternshipApplicationRow) => {
    setSelectedApp(app);
    setInternalNotes((app.metadata as any)?.internal_notes || '');
    setSignedResumeUrl(null);

    // If resume is stored, request signed URL
    if (app.resume_url && !app.resume_url.startsWith('http')) {
      setResumeLoading(true);
      try {
        const res = await fetch(
          `/api/admin/internships/applications?resumePath=${encodeURIComponent(app.resume_url)}`
        );
        const data = await res.json();
        if (data.success && data.signedUrl) {
          setSignedResumeUrl(data.signedUrl);
        }
      } catch (err) {
        console.warn('Error fetching signed resume URL:', err);
      } finally {
        setResumeLoading(false);
      }
    } else if (app.resume_url && app.resume_url.startsWith('http')) {
      setSignedResumeUrl(app.resume_url);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedApp) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/admin/internships/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedApp.id,
          newStatus,
          notes: internalNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedApp({ ...selectedApp, status: newStatus as any });
        fetchApplications();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const exportToCSV = () => {
    if (applications.length === 0) return;
    const headers = [
      'Application ID',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Branch',
      'Year of Study',
      'Program',
      'Mode',
      'Status',
      'Applied Date',
    ];
    const rows = applications.map((a) => [
      a.application_id,
      `"${a.full_name}"`,
      a.email,
      a.phone,
      `"${a.college}"`,
      `"${a.branch}"`,
      a.year_of_study,
      `"${a.preferred_program}"`,
      a.preferred_mode,
      a.status,
      new Date(a.created_at).toISOString().slice(0, 10),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HydroSync_Internship_Applicants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Nexonix Reflexo Candidate Pipeline
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Internship Applications ({applications.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Review applicant profiles, inspect resumes, transition pipeline statuses, and export reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={exportToCSV}
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            disabled={applications.length === 0}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>

          <Link href="/admin/internships">
            <Button size="sm" variant="ghost" className="text-xs">
              Programs Catalog &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Stage Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Stage Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = selectedStage === stage.key;
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setSelectedStage(stage.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-brand-primary/10 text-brand-primary dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure border-brand-primary/30'
                    : 'bg-theme-surface text-theme-muted hover:text-theme-heading border-theme-border'
                }`}
              >
                {stage.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates, college..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface text-xs text-theme-heading focus:outline-none focus:ring-1 focus:ring-brand-secondary"
          />
        </div>
      </div>

      {/* Pipeline Candidates Table */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tracking ID &amp; Candidate</th>
                <th className="py-3 px-4">College &amp; Branch</th>
                <th className="py-3 px-4">Program Track</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-theme-muted">
                    Loading candidate records...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-theme-muted">
                    No candidates found matching the selected filter.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-theme-bg/50 transition-colors group cursor-pointer"
                    onClick={() => handleOpenModal(app)}
                  >
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-[10px] text-brand-secondary block font-bold">
                          {app.application_id}
                        </span>
                        <span className="font-bold text-theme-heading text-sm block mt-0.5">
                          {app.full_name}
                        </span>
                        <span className="text-[11px] text-theme-muted block">{app.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-theme-body">
                      <div>
                        <span className="font-semibold text-theme-heading block">
                          {app.college}
                        </span>
                        <span className="text-[11px] text-theme-muted">
                          {app.branch} ({app.year_of_study})
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-theme-heading">
                      {app.preferred_program}
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-theme-bg border border-theme-border">
                        {app.preferred_mode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted text-[11px]">
                      {new Date(app.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-theme-bg border border-theme-border text-theme-body">
                        {app.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(app);
                        }}
                      >
                        <Eye className="h-3 w-3" />
                        <span>Review</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-theme-border">
              <div>
                <span className="font-mono text-xs font-bold text-brand-secondary">
                  {selectedApp.application_id}
                </span>
                <h3 className="text-xl font-bold font-heading text-theme-heading mt-0.5">
                  {selectedApp.full_name}
                </h3>
                <p className="text-xs text-theme-muted">
                  Applied on{' '}
                  {new Date(selectedApp.created_at).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-theme-muted hover:text-theme-heading rounded-lg"
              >
                &times;
              </button>
            </div>

            {/* Applicant Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted block">
                  Contact Information
                </span>
                <div className="flex items-center gap-2 text-theme-heading font-medium">
                  <Mail className="h-3.5 w-3.5 text-brand-secondary" />
                  <a href={`mailto:${selectedApp.email}`} className="hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-theme-heading font-medium">
                  <Phone className="h-3.5 w-3.5 text-brand-secondary" />
                  <a href={`tel:${selectedApp.phone}`} className="hover:underline">
                    {selectedApp.phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted block">
                  Academic Credentials
                </span>
                <div className="flex items-center gap-2 text-theme-heading font-medium">
                  <Building className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{selectedApp.college}</span>
                </div>
                <p className="text-theme-muted">
                  {selectedApp.branch} &bull; Year {selectedApp.year_of_study}
                </p>
              </div>
            </div>

            {/* Program Track Selection */}
            <div className="p-3.5 rounded-xl bg-brand-light-bg/40 dark:bg-brand-dark-surface border border-theme-border space-y-2 text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted block">
                Applied Program Track &amp; Mode
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-theme-heading text-sm">
                  {selectedApp.preferred_program}
                </span>
                <span className="px-2 py-0.5 rounded bg-brand-secondary/15 text-brand-secondary text-[11px] font-bold">
                  {selectedApp.preferred_mode}
                </span>
              </div>
              {selectedApp.additional_message && (
                <div className="mt-2 pt-2 border-t border-theme-border/60">
                  <span className="text-[10px] font-semibold uppercase text-theme-muted block">
                    Applicant Cover Note:
                  </span>
                  <p className="text-theme-body italic mt-1 leading-relaxed">
                    &ldquo;{selectedApp.additional_message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Resume / Portfolio Attachment */}
            <div className="p-3.5 rounded-xl border border-theme-border bg-theme-surface flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-brand-secondary" />
                <div>
                  <span className="text-xs font-bold text-theme-heading block">
                    Resume / Portfolio Document
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    {selectedApp.resume_url ? 'Attached file available' : 'No document submitted'}
                  </span>
                </div>
              </div>

              {selectedApp.resume_url && (
                <div>
                  {resumeLoading ? (
                    <span className="text-xs text-theme-muted">Generating signed link...</span>
                  ) : signedResumeUrl ? (
                    <a
                      href={signedResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-secondary text-white hover:bg-brand-secondary/90 transition-colors"
                    >
                      <span>Secure Preview</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-red-500">Unavailable</span>
                  )}
                </div>
              )}
            </div>

            {/* Internal Manager Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider">
                Private Evaluation Notes (Internal Only)
              </label>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Interview observations, test-bench scores, eligibility remarks..."
                className="w-full px-3 py-2 rounded-lg border border-theme-border bg-theme-bg text-xs text-theme-heading focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              />
            </div>

            {/* Pipeline Status Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-theme-border">
              <span className="text-xs font-semibold text-theme-heading uppercase tracking-wider block">
                Update Candidate Pipeline Status:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { status: 'under_review', label: 'Mark Under Review', variant: 'outline' },
                  { status: 'shortlisted', label: 'Shortlist Candidate', variant: 'outline' },
                  { status: 'accepted', label: 'Select / Offer', variant: 'default' },
                  { status: 'rejected', label: 'Reject', variant: 'destructive' },
                ].map((btn) => (
                  <Button
                    key={btn.status}
                    size="sm"
                    variant={btn.variant as any}
                    disabled={updatingStatus || selectedApp.status === btn.status}
                    onClick={() => handleUpdateStatus(btn.status)}
                    className="text-xs"
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

