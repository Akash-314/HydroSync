'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPagesListPage() {
  const [pages, setPages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    async function loadPages() {
      try {
        const res = await fetch('/api/admin/pages');
        const data = await res.json();
        if (data.success) {
          setPages(data.pages || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  const filtered = search.trim()
    ? pages.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.path.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase())
      )
    : pages;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Visual Section Content Management
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Website Pages CMS ({pages.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Edit heroes, marketing copy, feature blocks, and CTAs across all 22 public pages without touching code.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter pages by name, path or topic..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-theme-surface border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
        />
      </div>

      {/* Pages Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-theme-muted">Loading page catalog...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="p-5 rounded-2xl border border-theme-border bg-theme-surface hover:border-brand-primary/40 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-theme-bg text-brand-secondary border border-theme-border">
                    {p.path}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Live</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold font-heading text-theme-heading mt-2.5 group-hover:text-brand-primary transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-theme-muted mt-1 line-clamp-2">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-theme-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-theme-muted font-mono">
                  <Layers className="h-3.5 w-3.5" />
                  <span>{p.sectionCount > 0 ? `${p.sectionCount} CMS sections` : 'Dynamic sections'}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link href={p.path} target="_blank">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View live page">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link href={`/admin/pages/${p.slug}`}>
                    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs gap-1">
                      <Edit3 className="h-3 w-3" />
                      <span>Edit Content</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
