'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { BlogPostRow } from '@/lib/supabase/types';

export function BlogEditor({
  initialPost,
  isNew = false,
}: {
  initialPost?: Partial<BlogPostRow> | null;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [title, setTitle] = React.useState(initialPost?.title || '');
  const [slug, setSlug] = React.useState(initialPost?.slug || '');
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || '');
  const [content, setContent] = React.useState(initialPost?.content || '');
  const [coverImageUrl, setCoverImageUrl] = React.useState(initialPost?.cover_image_url || '');
  const [authorName, setAuthorName] = React.useState(initialPost?.author_name || 'HydroSync Engineering Team');
  const [category, setCategory] = React.useState(initialPost?.category || 'Embedded Systems');
  const [readTimeMinutes, setReadTimeMinutes] = React.useState(initialPost?.read_time_minutes || 5);
  const [isPublished, setIsPublished] = React.useState(initialPost?.is_published ?? true);

  // Tags
  const [tags, setTags] = React.useState<string[]>(
    initialPost?.tags || ['Firmware', 'IoT', 'Hardware']
  );
  const [newTag, setNewTag] = React.useState('');

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

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl || null,
      author_name: authorName,
      category,
      tags,
      read_time_minutes: Number(readTimeMinutes),
      is_published: isPublished,
    };

    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${initialPost?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMsg = data.message || 'Failed to save article';
        if (res.status === 401 || res.status === 403 || errorMsg.toLowerCase().includes('session') || errorMsg.toLowerCase().includes('auth')) {
          errorMsg = 'Administrator authentication required or session expired. Please sign in to save changes.';
        }
        throw new Error(errorMsg);
      }

      setMessage({ text: isNew ? 'Article created!' : 'Article updated!', type: 'success' });
      if (isNew && data.post?.id) {
        router.push(`/admin/blog/${data.post.id}`);
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
    if (!initialPost?.id) return;
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${initialPost.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete post');
      }
      router.push('/admin/blog');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
              {isNew ? 'New Technical Article' : 'Edit Article'}
            </span>
            <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
              {isNew ? 'Create Engineering Article' : title}
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
              Article Content &amp; Markdown
            </h2>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. FreeRTOS Task Scheduling on Dual-Core ESP32"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="freertos-task-scheduling-esp32"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Embedded Systems / IoT Protocols / R&D"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Excerpt / Summary (Meta Description) *
              </label>
              <textarea
                rows={2}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="One or two sentences explaining the core insights of this article..."
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Article Body (Markdown Supported) *
              </label>
              <textarea
                rows={16}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Heading 1&#10;&#10;Write your deep-dive technical engineering article here..."
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Article Tags
            </h2>

            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add keyword tag..."
                className="flex-1 px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag} className="gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tag</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h3 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Publishing &amp; Author
            </h3>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Author Byline
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="HydroSync Engineering Team"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Estimated Read Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                value={readTimeMinutes}
                onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Cover Image CDN URL
              </label>
              <input
                type="text"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="/blog/freertos-cover.jpg"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-theme-border bg-theme-bg/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <div>
                  <span className="text-xs font-semibold text-theme-heading block">
                    Published Live
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    Visible on public /blog and RSS feeds.
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

