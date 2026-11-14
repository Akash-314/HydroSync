'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { CourseRow } from '@/lib/supabase/types';

interface ModuleItem {
  module_number: number;
  title: string;
  duration_weeks: number;
  topics: string[];
}

export function CourseEditor({
  initialCourse,
  isNew = false,
}: {
  initialCourse?: Partial<CourseRow> | null;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [title, setTitle] = React.useState(initialCourse?.title || '');
  const [slug, setSlug] = React.useState(initialCourse?.slug || '');
  const [category, setCategory] = React.useState<CourseRow['category']>(initialCourse?.category || 'Embedded Systems');
  const [level, setLevel] = React.useState<CourseRow['level']>(initialCourse?.level || 'Intermediate');
  const [durationWeeks, setDurationWeeks] = React.useState(initialCourse?.duration_weeks || 4);
  const [learningMode, setLearningMode] = React.useState<CourseRow['learning_mode']>(initialCourse?.learning_mode || 'Hybrid');
  const [priceInr, setPriceInr] = React.useState(initialCourse?.price_inr || 0);
  const [shortDescription, setShortDescription] = React.useState(initialCourse?.short_description || '');
  const [overview, setOverview] = React.useState(initialCourse?.overview || '');
  const [isPublished, setIsPublished] = React.useState(initialCourse?.is_published ?? true);

  // Tags
  const [prerequisites, setPrerequisites] = React.useState<string[]>(initialCourse?.prerequisites || ['Basic C Programming']);
  const [newPrereq, setNewPrereq] = React.useState('');

  const [hardwareTools, setHardwareTools] = React.useState<string[]>(initialCourse?.hardware_tools || ['STM32 Nucleo Board']);
  const [newTool, setNewTool] = React.useState('');

  // Syllabus structure
  const initialSyllabus: ModuleItem[] = Array.isArray(initialCourse?.syllabus)
    ? (initialCourse.syllabus as unknown as ModuleItem[])
    : [
        {
          module_number: 1,
          title: 'Foundations & Architecture',
          duration_weeks: 1,
          topics: ['System architecture overview', 'Register-level peripheral configuration'],
        },
      ];
  const [syllabus, setSyllabus] = React.useState<ModuleItem[]>(initialSyllabus);

  // Auto-generate slug from title if new
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

  const addModule = () => {
    setSyllabus([
      ...syllabus,
      {
        module_number: syllabus.length + 1,
        title: `Module ${syllabus.length + 1}`,
        duration_weeks: 1,
        topics: ['New topic'],
      },
    ]);
  };

  const removeModule = (index: number) => {
    setSyllabus(syllabus.filter((_, idx) => idx !== index));
  };

  const updateModuleTitle = (index: number, val: string) => {
    const updated = [...syllabus];
    updated[index].title = val;
    setSyllabus(updated);
  };

  const addTopicToModule = (index: number, topic: string) => {
    if (!topic.trim()) return;
    const updated = [...syllabus];
    updated[index].topics.push(topic.trim());
    setSyllabus(updated);
  };

  const removeTopicFromModule = (modIdx: number, topicIdx: number) => {
    const updated = [...syllabus];
    updated[modIdx].topics = updated[modIdx].topics.filter((_, idx) => idx !== topicIdx);
    setSyllabus(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      category,
      level,
      duration_weeks: durationWeeks,
      learning_mode: learningMode,
      price_inr: priceInr,
      short_description: shortDescription,
      overview,
      syllabus,
      prerequisites,
      hardware_tools: hardwareTools,
      is_published: isPublished,
    };

    try {
      const endpoint = isNew ? '/api/admin/courses' : `/api/admin/courses/${initialCourse?.id || slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error saving course');
      }

      setMessage({ text: 'Course successfully saved and published to database.', type: 'success' });
      if (isNew) {
        router.push('/admin/courses');
      }
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error occurred';
      setMessage({ text: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <Link
          href="/admin/courses"
          className="flex items-center gap-2 text-xs font-semibold text-theme-muted hover:text-theme-heading transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Courses List</span>
        </Link>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded border-theme-border text-brand-secondary focus:ring-brand-secondary"
            />
            <span>{isPublished ? 'Status: Published' : 'Status: Draft'}</span>
          </label>

          <Button type="submit" disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            <span>{loading ? 'Saving...' : isNew ? 'Create Course' : 'Update Course'}</span>
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. Core Metadata */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-6">
        <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
          Course Core Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Course Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Advanced ARM Cortex-M Embedded Systems"
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="arm-cortex-embedded-systems"
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CourseRow['category'])}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              <option value="Embedded Systems">Embedded Systems</option>
              <option value="IoT">IoT</option>
              <option value="Edge AI">Edge AI</option>
              <option value="Robotics">Robotics</option>
              <option value="VLSI">VLSI</option>
              <option value="PCB Design">PCB Design</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Skill Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as CourseRow['level'])}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Duration (Weeks)
            </label>
            <input
              type="number"
              min={1}
              max={52}
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Learning Fee (INR)
            </label>
            <input
              type="number"
              min={0}
              value={priceInr}
              onChange={(e) => setPriceInr(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
            Short Description (Catalog Summary)
          </label>
          <textarea
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Brief 1-2 sentence overview shown on course cards..."
            className="w-full px-3.5 py-2 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
            Detailed Course Overview
          </label>
          <textarea
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Comprehensive description of the curriculum, real-world relevance, and laboratory practice..."
            className="w-full px-3.5 py-2 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
      </div>

      {/* 2. Syllabus Module Builder */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
              Syllabus Structure
            </h3>
            <p className="text-xs text-theme-muted mt-0.5">
              Configure curriculum modules and individual lecture topics.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addModule} className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Module</span>
          </Button>
        </div>

        <div className="space-y-4">
          {syllabus.map((mod, modIdx) => (
            <div
              key={modIdx}
              className="p-4 rounded-xl border border-theme-border/80 bg-theme-bg/50 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="h-6 w-6 rounded bg-brand-secondary/15 text-brand-secondary font-bold text-xs flex items-center justify-center shrink-0">
                    {modIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => updateModuleTitle(modIdx, e.target.value)}
                    placeholder="Module title..."
                    className="w-full px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface text-theme-heading text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeModule(modIdx)}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Module"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Topics List */}
              <div className="pl-8 space-y-2">
                <div className="space-y-1.5">
                  {mod.topics.map((topic, topIdx) => (
                    <div key={topIdx} className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-theme-surface border border-theme-border/60">
                      <span>{topic}</span>
                      <button
                        type="button"
                        onClick={() => removeTopicFromModule(modIdx, topIdx)}
                        className="text-theme-muted hover:text-red-500 text-[10px]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={`topic-input-${modIdx}`}
                    placeholder="Add topic..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const el = e.currentTarget;
                        addTopicToModule(modIdx, el.value);
                        el.value = '';
                      }
                    }}
                    className="w-full px-2.5 py-1 text-xs rounded border border-theme-border bg-theme-surface focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-[11px]"
                    onClick={() => {
                      const el = document.getElementById(`topic-input-${modIdx}`) as HTMLInputElement;
                      if (el && el.value) {
                        addTopicToModule(modIdx, el.value);
                        el.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Prerequisites & Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Prerequisites */}
        <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
          <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {prerequisites.map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-theme-bg border border-theme-border"
              >
                <span>{p}</span>
                <button
                  type="button"
                  onClick={() => setPrerequisites(prerequisites.filter((_, i) => i !== idx))}
                  className="text-theme-muted hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newPrereq}
              onChange={(e) => setNewPrereq(e.target.value)}
              placeholder="e.g. Basic Electronics"
              className="w-full px-3 py-1.5 rounded-lg border border-theme-border bg-theme-bg text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (newPrereq.trim()) {
                  setPrerequisites([...prerequisites, newPrereq.trim()]);
                  setNewPrereq('');
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Hardware & Software Tools */}
        <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
          <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
            Hardware &amp; Software Tools
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {hardwareTools.map((t, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-theme-bg border border-theme-border"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => setHardwareTools(hardwareTools.filter((_, i) => i !== idx))}
                  className="text-theme-muted hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              placeholder="e.g. STM32CubeIDE, Logic Analyzer"
              className="w-full px-3 py-1.5 rounded-lg border border-theme-border bg-theme-bg text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (newTool.trim()) {
                  setHardwareTools([...hardwareTools, newTool.trim()]);
                  setNewTool('');
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
