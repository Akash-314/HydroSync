'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { ProjectRow } from '@/lib/supabase/types';

export function ProjectEditor({
  initialProject,
  isNew = false,
}: {
  initialProject?: Partial<ProjectRow> | null;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [title, setTitle] = React.useState(initialProject?.title || '');
  const [slug, setSlug] = React.useState(initialProject?.slug || '');
  const [category, setCategory] = React.useState<ProjectRow['category']>(
    initialProject?.category || 'Industrial IoT'
  );
  const [clientType, setClientType] = React.useState(initialProject?.client_type || 'Commercial Enterprise');
  const [problemStatement, setProblemStatement] = React.useState(initialProject?.problem_statement || '');
  const [technicalSolution, setTechnicalSolution] = React.useState(initialProject?.technical_solution || '');
  const [imageUrl, setImageUrl] = React.useState(initialProject?.image_url || '');
  const [featured, setFeatured] = React.useState(initialProject?.featured ?? false);
  const [isPublished, setIsPublished] = React.useState(initialProject?.is_published ?? true);
  const [displayOrder, setDisplayOrder] = React.useState(initialProject?.display_order || 0);

  // Stack tags
  const [stack, setStack] = React.useState<string[]>(
    initialProject?.stack || ['ESP32', 'FreeRTOS', 'MQTT', 'AWS IoT Core']
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
    if (newTag.trim() && !stack.includes(newTag.trim())) {
      setStack([...stack, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setStack(stack.filter((t) => t !== tag));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      category,
      client_type: clientType || null,
      problem_statement: problemStatement,
      technical_solution: technicalSolution,
      stack,
      image_url: imageUrl || null,
      featured,
      is_published: isPublished,
      display_order: Number(displayOrder),
    };

    try {
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${initialProject?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMsg = data.message || 'Failed to save project';
        if (res.status === 401 || res.status === 403 || errorMsg.toLowerCase().includes('session') || errorMsg.toLowerCase().includes('auth')) {
          errorMsg = 'Administrator authentication required or session expired. Please sign in to save changes.';
        }
        throw new Error(errorMsg);
      }

      setMessage({ text: isNew ? 'Project created successfully!' : 'Project updated successfully!', type: 'success' });
      if (isNew && data.project?.id) {
        router.push(`/admin/projects/${data.project.id}`);
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
    if (!initialProject?.id) return;
    if (!confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${initialProject.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete project');
      }
      router.push('/admin/projects');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
              {isNew ? 'New Engineering Project' : 'Edit Showcase Project'}
            </span>
            <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
              {isNew ? 'Create R&D / Client Project' : title}
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
              Project Specification
            </h2>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Autonomous LoRa Smart Irrigation Grid"
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
                  placeholder="autonomous-lora-smart-irrigation-grid"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Domain Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectRow['category'])}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                >
                  <option value="Industrial IoT">Industrial IoT</option>
                  <option value="Smart Agriculture">Smart Agriculture</option>
                  <option value="Water Telemetry">Water Telemetry</option>
                  <option value="Edge AI">Edge AI</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Embedded Firmware">Embedded Firmware</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Client / Deployment Type
              </label>
              <input
                type="text"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                placeholder="Agricultural Cooperative / Industrial Factory"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Problem Statement *
              </label>
              <textarea
                rows={3}
                required
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="What operational or engineering challenge did this project address?"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Technical Solution &amp; Engineering Architecture *
              </label>
              <textarea
                rows={5}
                required
                value={technicalSolution}
                onChange={(e) => setTechnicalSolution(e.target.value)}
                placeholder="Describe the hardware, sensor interfaces, firmware stack, edge compute, and cloud telemetry pipeline implemented..."
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Technology Stack
            </h2>

            <div className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
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
                placeholder="Add technology (e.g. FreeRTOS, STM32, LoRaWAN)..."
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
              Display &amp; Visibility
            </h3>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Cover Image CDN URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/projects/irrigation-bench.jpg or Supabase Storage URL"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Display Order Priority
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
              />
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Lower number displays first in showcase list.
              </span>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-theme-border bg-theme-bg/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <div>
                  <span className="text-xs font-semibold text-theme-heading block">
                    Featured Project
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    Showcase on Home page featured carousel.
                  </span>
                </div>
              </label>

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
                    Visible on public /projects catalog.
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

