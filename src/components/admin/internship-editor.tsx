'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { InternshipProgramRow } from '@/lib/supabase/types';

export function InternshipEditor({
  initialProgram,
  isNew = false,
}: {
  initialProgram?: Partial<InternshipProgramRow> | null;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [title, setTitle] = React.useState(initialProgram?.title || '');
  const [slug, setSlug] = React.useState(initialProgram?.slug || '');
  const [domain, setDomain] = React.useState(initialProgram?.domain || 'IoT & Embedded Systems');
  const [duration, setDuration] = React.useState(initialProgram?.duration || '4 to 8 Weeks');
  const [mode, setMode] = React.useState<InternshipProgramRow['mode']>(initialProgram?.mode || 'Hybrid');
  const [seatsAvailable, setSeatsAvailable] = React.useState(initialProgram?.seats_available || 30);
  const [shortDescription, setShortDescription] = React.useState(initialProgram?.short_description || '');
  const [eligibility, setEligibility] = React.useState(
    initialProgram?.eligibility || 'B.Tech / B.E. / Diploma in ECE, EEE, CSE, IT or Mechatronics'
  );
  const [isActive, setIsActive] = React.useState(initialProgram?.is_active ?? true);

  // Learning outcomes
  const [outcomes, setOutcomes] = React.useState<string[]>(
    initialProgram?.learning_outcomes || [
      'Industrial hardware bring-up and firmware debugging',
      'Telemetry protocol implementation (MQTT, TLS 1.3, LoRaWAN)',
      'Real-world sensor interfacing and edge AI deployment',
    ]
  );
  const [newOutcome, setNewOutcome] = React.useState('');

  // Hardware exposure
  const [hardware, setHardware] = React.useState<string[]>(
    initialProgram?.hardware_exposure || ['STM32F4', 'ESP32-S3', 'LoRa SX1262', 'Digital Storage Oscilloscope']
  );
  const [newHardware, setNewHardware] = React.useState('');

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      domain,
      duration,
      mode,
      seats_available: seatsAvailable,
      short_description: shortDescription,
      eligibility,
      learning_outcomes: outcomes,
      hardware_exposure: hardware,
      is_active: isActive,
    };

    try {
      const endpoint = isNew ? '/api/admin/internships' : `/api/admin/internships/${initialProgram?.id || slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error saving internship program');
      }

      setMessage({ text: 'Internship program successfully updated in database.', type: 'success' });
      if (isNew) {
        router.push('/admin/internships');
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
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <Link
          href="/admin/internships"
          className="flex items-center gap-2 text-xs font-semibold text-theme-muted hover:text-theme-heading transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Programs List</span>
        </Link>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-theme-border text-brand-secondary focus:ring-brand-secondary"
            />
            <span>{isActive ? 'Status: Active' : 'Status: Archived'}</span>
          </label>

          <Button type="submit" disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            <span>{loading ? 'Saving...' : isNew ? 'Create Program' : 'Update Program'}</span>
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

      {/* Core Program Information */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-6">
        <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
          Program Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Program Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Industrial IoT & Connected Silicon Internship"
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
              placeholder="industrial-iot-silicon"
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Domain / Specialization
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              <option value="IoT & Embedded Systems">IoT &amp; Embedded Systems</option>
              <option value="Edge AI & TinyML">Edge AI &amp; TinyML</option>
              <option value="Embedded Firmware & RTOS">Embedded Firmware &amp; RTOS</option>
              <option value="PCB Design & Hardware Prototyping">PCB Design &amp; Prototyping</option>
              <option value="Robotics & Autonomous Systems">Robotics &amp; Autonomous Systems</option>
              <option value="Python & AI Development">Python &amp; AI Development</option>
              <option value="Web & Cloud Platforms">Web &amp; Cloud Platforms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 4 Weeks / 8 Weeks"
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Delivery Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as InternshipProgramRow['mode'])}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              <option value="Hybrid">Hybrid (Lab + Online)</option>
              <option value="Offline">Offline Hardware Lab</option>
              <option value="Online">Online Interactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Available Seats Per Batch
            </label>
            <input
              type="number"
              min={1}
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
              Target Eligibility
            </label>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              placeholder="e.g. 2nd, 3rd, 4th Year B.Tech / Diploma students"
              className="w-full px-3.5 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-heading uppercase tracking-wider mb-1.5">
            Short Description (Catalog Overview)
          </label>
          <textarea
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Concise overview of hands-on workbench projects and deliverables..."
            className="w-full px-3.5 py-2 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
      </div>

      {/* Learning Outcomes & Hardware Workbench Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Learning Outcomes */}
        <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
          <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
            Key Learning Outcomes
          </h3>
          <div className="space-y-1.5">
            {outcomes.map((out, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-theme-bg border border-theme-border">
                <span>{out}</span>
                <button
                  type="button"
                  onClick={() => setOutcomes(outcomes.filter((_, i) => i !== idx))}
                  className="text-theme-muted hover:text-red-500 text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
              placeholder="Add learning objective..."
              className="w-full px-3 py-1.5 rounded-lg border border-theme-border bg-theme-bg text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (newOutcome.trim()) {
                  setOutcomes([...outcomes, newOutcome.trim()]);
                  setNewOutcome('');
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Hardware Exposure */}
        <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
          <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-theme-heading">
            Hardware &amp; Workbench Exposure
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {hardware.map((h, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-theme-bg border border-theme-border"
              >
                <span>{h}</span>
                <button
                  type="button"
                  onClick={() => setHardware(hardware.filter((_, i) => i !== idx))}
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
              value={newHardware}
              onChange={(e) => setNewHardware(e.target.value)}
              placeholder="e.g. STM32, Logic Analyzer"
              className="w-full px-3 py-1.5 rounded-lg border border-theme-border bg-theme-bg text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (newHardware.trim()) {
                  setHardware([...hardware, newHardware.trim()]);
                  setNewHardware('');
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

