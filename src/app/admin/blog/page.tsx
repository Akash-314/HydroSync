import * as React from 'react';
import Link from 'next/link';
import { BookOpen, PlusCircle, Edit3, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { BlogPostRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchAdminBlog(): Promise<BlogPostRow[]> {
  const client = getActiveServerClient();
  if (!client) return [];

  try {
    const { data } = await client
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    return (data || []) as BlogPostRow[];
  } catch {
    return [];
  }
}

export default async function AdminBlogPage() {
  const posts = await fetchAdminBlog();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Engineering Insights &amp; Whitepapers
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Technical Blog ({posts.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Author deep-dive technical tutorials, embedded systems whitepapers, and hardware case studies.
          </p>
        </div>

        <Link href="/admin/blog/new">
          <Button className="gap-2 text-xs">
            <PlusCircle className="h-4 w-4" />
            <span>Write New Article</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-muted uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Article Title &amp; Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-theme-muted">
                    No articles published yet. Click &ldquo;Write New Article&rdquo; to draft one.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-theme-bg/50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-theme-heading text-sm group-hover:text-brand-secondary transition-colors block">
                          {post.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-theme-bg border border-theme-border text-brand-primary">
                            {post.category}
                          </span>
                          <span className="text-[11px] text-theme-muted font-mono">
                            /{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted">
                      {post.author_name}
                    </td>

                    <td className="py-3.5 px-4 text-theme-muted font-mono">
                      {post.read_time_minutes} min read
                    </td>

                    <td className="py-3.5 px-4">
                      {post.is_published ? (
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

                    <td className="py-3.5 px-4 text-theme-muted font-mono text-[11px]">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Preview Public Post">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${post.id}`}>
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

