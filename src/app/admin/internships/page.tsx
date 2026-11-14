import * as React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  PlusCircle,
  Edit3,
  Eye,
  CheckCircle2,
  Clock,
  Users2,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import { INTERNSHIP_PROGRAMS as fallbackPrograms } from '@/data/internships';
import type { InternshipProgramRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminPrograms(): Promise<InternshipProgramRow[]> {
  const mapFallback = () =>
    fallbackPrograms.map((p, i) => ({
      id: p.id,
      slug: p.id,
      title: p.title,
      domain: p.domain,
      duration: p.durations[0] || '6 Weeks',
      mode: 'Hybrid' as InternshipProgramRow['mode'],
      short_description: p.summary,
      eligibility: p.eligibility.join(', '),
      learning_outcomes: p.skillsGained,
      hardware_exposure: [p.hardwareKit],
      seats_available: 30,
      is_active: true,
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
      .from('internship_programs')
      .select('*')
      .order('display_order', { ascending: true });

    if (data && data.length > 0) {
      return data as InternshipProgramRow[];
    }
  } catch {
    // fallback
  }

  return mapFallback();
}

export default async function AdminInternshipsPage() {
  const programs = await fetchAdminPrograms();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Nexonix Reflexo Internship System
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Internship Programs ({programs.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Manage technical internship domains, eligibility, batch deadlines, and seat capacity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/internships/applications">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Users2 className="h-3.5 w-3.5" />
              <span>Review Pipeline</span>
            </Button>
          </Link>

          <Link href="/admin/internships/new">
            <Button size="sm" className="gap-2 text-xs">
              <PlusCircle className="h-4 w-4" />
              <span>Add New Program</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Programs List Table */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Program Track &amp; Domain</th>
                <th className="py-3 px-4">Duration &amp; Mode</th>
                <th className="py-3 px-4">Available Seats</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {programs.map((program) => (
                <tr
                  key={program.id || program.slug}
                  className="hover:bg-theme-bg/50 transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors block">
                          {program.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-brand-light-bg text-brand-secondary border border-brand-secondary/20">
                            {program.domain}
                          </span>
                          <span className="font-mono text-[10px] text-theme-muted">
                            /{program.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-theme-muted">
                    <div className="flex flex-col">
                      <span className="font-semibold text-theme-heading">{program.duration}</span>
                      <span className="text-[11px]">{program.mode} Delivery</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-theme-heading">
                    {program.seats_available} Seats
                  </td>

                  <td className="py-3.5 px-4">
                    {program.is_active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Clock className="h-3 w-3" />
                        <span>Archived</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/internships`} target="_blank">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-theme-muted hover:text-theme-heading"
                          title="Preview on Public Site"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>

                      <Link href={`/admin/internships/${program.id || program.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs h-8"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit Program</span>
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
