'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  History,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPageEditor() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [pageMeta, setPageMeta] = React.useState<any | null>(null);
  const [sections, setSections] = React.useState<any[]>([]);
  const [revisions, setRevisions] = React.useState<any[]>([]);
  const [status, setStatus] = React.useState<'published' | 'draft'>('published');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = React.useState<'editor' | 'history'>('editor');

  const fetchPageData = React.useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/admin/pages/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPageMeta(data.page);
        setRevisions(data.revisions || []);
        if (data.sections && data.sections.length > 0) {
          setSections(data.sections);
          setStatus(data.sections[0]?.status || 'published');
        } else {
          // Initialize with standard Hero section
          setSections([
            {
              section_key: 'hero',
              title: data.page?.name || 'Headline',
              subtitle: data.page?.desc || 'Subheadline and introduction...',
              content: '',
              media_url: '',
              cta_text: 'Explore Programs',
              cta_url: '/courses',
              secondary_cta_text: 'Contact Team',
              secondary_cta_url: '/contact',
              is_published: true,
            },
            {
              section_key: 'main_content',
              title: 'Core Curriculum & Details',
              subtitle: 'Key specifications and technical components',
              content: 'Add structured page content and insights here...',
              media_url: '',
              is_published: true,
            },
          ]);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [slug]);

  React.useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections, status }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update page');
      }

      setMessage({ text: 'Page updated and published successfully!', type: 'success' });
      fetchPageData();
    } catch (err: unknown) {
      setMessage({ text: err instanceof Error ? err.message : 'Save error', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    const key = `section_${Date.now()}`;
    setSections([
      ...sections,
      {
        section_key: key,
        title: 'New Section Title',
        subtitle: 'Section subtitle',
        content: '',
        media_url: '',
        cta_text: '',
        cta_url: '',
        is_published: true,
      },
    ]);
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) {
      alert('A page requires at least one content section.');
      return;
    }
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSectionField = (index: number, field: string, val: any) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: val };
    setSections(updated);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setSections(updated);
  };

  const restoreRevision = (rev: any) => {
    if (!confirm(`Restore version #${rev.version_number} saved on ${new Date(rev.created_at).toLocaleString()}?`)) return;
    if (rev.snapshot?.sections) {
      setSections(rev.snapshot.sections);
      setStatus(rev.snapshot.status || 'published');
      setActiveTab('editor');
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-xs text-theme-muted">Loading page sections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
                Page CMS Editor
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-theme-bg border border-theme-border text-theme-muted">
                {pageMeta?.path}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
              {pageMeta?.name || slug}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pageMeta?.path && (
            <Link href={pageMeta.path} target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Eye className="h-3.5 w-3.5" />
                <span>View Live</span>
              </Button>
            </Link>
          )}
          <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5 text-xs">
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-theme-border pb-3">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'editor'
              ? 'bg-brand-primary text-white'
              : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Section Builder ({sections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'history'
              ? 'bg-brand-primary text-white'
              : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
          }`}
        >
          <History className="h-3.5 w-3.5" />
          <span>Version History ({revisions.length})</span>
        </button>
      </div>

      {activeTab === 'editor' ? (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl border border-theme-border bg-theme-surface">
            <div>
              <span className="text-xs font-bold text-theme-heading block">Publication Status</span>
              <span className="text-[11px] text-theme-muted">
                Control whether this page content version is actively served to public visitors.
              </span>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-semibold focus:outline-hidden"
            >
              <option value="published">Published (Live to World)</option>
              <option value="draft">Draft (Admin Only)</option>
            </select>
          </div>

          {/* Section cards */}
          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div
                key={sec.section_key || idx}
                className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-theme-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold">
                      SECTION {idx + 1}: {sec.section_key}
                    </span>
                    {sec.is_published ? (
                      <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-semibold">Hidden</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="h-7 w-7 p-0"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="h-7 w-7 p-0"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(idx)}
                      className="h-7 w-7 p-0 text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-theme-heading mb-1">
                      Section Key / ID
                    </label>
                    <input
                      type="text"
                      value={sec.section_key || ''}
                      onChange={(e) => updateSectionField(idx, 'section_key', e.target.value)}
                      placeholder="e.g. hero, overview, benefits"
                      className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-theme-heading mb-1">
                      Section Heading / Title
                    </label>
                    <input
                      type="text"
                      value={sec.title || ''}
                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                      placeholder="Headline text..."
                      className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Subtitle / Lead Sentence
                  </label>
                  <input
                    type="text"
                    value={sec.subtitle || ''}
                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                    placeholder="Supporting subtext or badge text..."
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Body Content (Markdown Supported)
                  </label>
                  <textarea
                    rows={4}
                    value={sec.content || ''}
                    onChange={(e) => updateSectionField(idx, 'content', e.target.value)}
                    placeholder="Paragraphs, bullet points, technical details..."
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-theme-heading mb-1">
                      Media / Illustration URL
                    </label>
                    <input
                      type="text"
                      value={sec.media_url || ''}
                      onChange={(e) => updateSectionField(idx, 'media_url', e.target.value)}
                      placeholder="/hero-image.png or Supabase Storage URL"
                      className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 text-xs font-semibold text-theme-heading cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sec.is_published ?? true}
                        onChange={(e) => updateSectionField(idx, 'is_published', e.target.checked)}
                        className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                      />
                      <span>Show this section on public site</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-theme-border/60">
                  <div>
                    <label className="block text-[11px] font-semibold text-theme-heading mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={sec.cta_text || ''}
                      onChange={(e) => updateSectionField(idx, 'cta_text', e.target.value)}
                      placeholder="e.g. Apply Now"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-theme-heading mb-1">
                      Primary CTA URL
                    </label>
                    <input
                      type="text"
                      value={sec.cta_url || ''}
                      onChange={(e) => updateSectionField(idx, 'cta_url', e.target.value)}
                      placeholder="/courses"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-theme-heading mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={sec.secondary_cta_text || ''}
                      onChange={(e) => updateSectionField(idx, 'secondary_cta_text', e.target.value)}
                      placeholder="e.g. Lab Tour"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-theme-heading mb-1">
                      Secondary CTA URL
                    </label>
                    <input
                      type="text"
                      value={sec.secondary_cta_url || ''}
                      onChange={(e) => updateSectionField(idx, 'secondary_cta_url', e.target.value)}
                      placeholder="/contact"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button type="button" variant="outline" size="sm" onClick={addSection} className="gap-2 text-xs">
              <Plus className="h-4 w-4" />
              <span>Add Another Section</span>
            </Button>

            <Button type="submit" disabled={saving} size="sm" className="gap-2 text-xs">
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? 'Publishing...' : 'Save & Publish Changes'}</span>
            </Button>
          </div>
        </form>
      ) : (
        /* Version History */
        <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs">
          <div className="p-4 border-b border-theme-border">
            <h3 className="text-sm font-bold font-heading text-theme-heading">
              Immutable Content Revisions ({revisions.length})
            </h3>
            <p className="text-xs text-theme-muted mt-0.5">
              Every save creates an audit snapshot. You can roll back to any historical version at any time.
            </p>
          </div>

          <div className="divide-y divide-theme-border/60">
            {revisions.length === 0 ? (
              <div className="p-8 text-center text-xs text-theme-muted">
                No previous revisions recorded. First save will initialize version history.
              </div>
            ) : (
              revisions.map((rev) => (
                <div key={rev.id} className="p-4 flex items-center justify-between hover:bg-theme-bg/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-secondary">
                        Version #{rev.version_number}
                      </span>
                      <span className="text-[11px] text-theme-muted">
                        Saved by {rev.created_by || 'Administrator'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-theme-muted block mt-1">
                      {new Date(rev.created_at).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => restoreRevision(rev)}
                    className="text-xs h-8"
                  >
                    Restore This Version
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
