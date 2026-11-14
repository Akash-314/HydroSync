import * as React from 'react';
import Link from 'next/link';
import { Cpu, PlusCircle, Edit3, Eye, CheckCircle2, XCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { ProjectRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminProjects(): Promise<ProjectRow[]> {
  const client = getActiveServerClient();
  if (!client) return [];

  try {
    const { data } = await client
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    return (data || []) as ProjectRow[];
  } catch {
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await fetchAdminProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            R&amp;D Innovations &amp; Client Deployments
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Projects Showcase ({projects.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Manage engineering projects, technical stack tags, and home page feature flags.
          </p>
        </div>

        <Link href="/admin/projects/new">
          <Button className="gap-2 text-xs">
            <PlusCircle className="h-4 w-4" />
            <span>Create New Project</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Project Title &amp; Domain</th>
                <th className="py-3 px-4">Technology Stack</th>
                <th className="py-3 px-4">Client / Deployment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-theme-muted">
                    No projects found in database. Click &ldquo;Create New Project&rdquo; to publish one.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-theme-bg/50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors">
                            {proj.title}
                          </span>
                          {proj.featured && (
                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-brand-primary">
                          {proj.category}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(proj.stack || []).slice(0, 3).map((st) => (
                          <span
                            key={st}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-theme-bg border border-theme-border text-theme-muted"
                          >
                            {st}
                          </span>
                        ))}
                        {(proj.stack || []).length > 3 && (
                          <span className="text-[10px] text-theme-muted">
                            +{(proj.stack || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      {proj.client_type || 'Internal R&D'}
                    </td>

                    <td className="py-3.5 px-4">
                      {proj.is_published ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                          <XCircle className="h-3 w-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-theme-muted">
                      #{proj.display_order}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/projects/${proj.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Preview Public Page">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/admin/projects/${proj.id}`}>
                          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs gap-1">
                            <Edit3 className="h-3 w-3" />
                            <span>Edit</span>
                          </Button>
                        </Link>
                      </div>
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
