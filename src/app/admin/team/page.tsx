import * as React from 'react';
import Link from 'next/link';
import { Users2, PlusCircle, Edit3, Linkedin, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { TeamMemberRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminTeam(): Promise<TeamMemberRow[]> {
  const client = getActiveServerClient();
  if (!client) return [];

  try {
    const { data } = await client
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    return (data || []) as TeamMemberRow[];
  } catch {
    return [];
  }
}

export default async function AdminTeamPage() {
  const members = await fetchAdminTeam();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Engineering Leaders &amp; Specialists
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Team Directory ({members.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Manage executive leadership, senior researchers, and hardware engineers.
          </p>
        </div>

        <Link href="/admin/team/new">
          <Button className="gap-2 text-xs">
            <PlusCircle className="h-4 w-4" />
            <span>Add Team Member</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Member Name &amp; Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">LinkedIn</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-theme-muted">
                    No team members listed in database. Click &ldquo;Add Team Member&rdquo; to add one.
                  </td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id} className="hover:bg-theme-bg/50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors block">
                          {m.full_name}
                        </span>
                        <span className="text-[11px] text-theme-muted">
                          {m.role}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      {m.department}
                    </td>

                    <td className="py-3.5 px-4">
                      {m.linkedin_url ? (
                        <a
                          href={m.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:text-brand-secondary inline-flex items-center gap-1"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Profile</span>
                        </a>
                      ) : (
                        <span className="text-theme-muted text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {m.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                          <XCircle className="h-3 w-3" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-theme-muted">
                      #{m.display_order}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/admin/team/${m.id}`}>
                        <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs gap-1">
                          <Edit3 className="h-3 w-3" />
                          <span>Edit</span>
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
