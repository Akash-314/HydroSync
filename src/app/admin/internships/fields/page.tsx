'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Save,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InternshipFormFieldRow } from '@/lib/supabase/types';

export default function InternshipFormFieldsConfigPage() {
  const [fields, setFields] = React.useState<InternshipFormFieldRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const fetchFields = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/internships/fields');
      const data = await res.json();
      if (data.success) {
        setFields(data.fields || []);
      }
    } catch (e) {
      console.error('Error fetching fields:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFields();
  }, []);

  const handleToggleRequired = (index: number) => {
    const updated = [...fields];
    updated[index].is_required = !updated[index].is_required;
    setFields(updated);
  };

  const handleToggleEnabled = (index: number) => {
    const updated = [...fields];
    updated[index].is_enabled = !updated[index].is_enabled;
    setFields(updated);
  };

  const handleLabelChange = (index: number, val: string) => {
    const updated = [...fields];
    updated[index].label = val;
    setFields(updated);
  };

  const handleSaveField = async (field: InternshipFormFieldRow) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/internships/fields', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(field),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Field "${field.label}" updated successfully.`);
      }
    } catch {
      setMessage('Error updating field.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <Link
            href="/admin/internships"
            className="flex items-center gap-2 text-xs font-semibold text-theme-muted hover:text-theme-heading transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Internship Programs</span>
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Nexonix Reflexo Form Builder
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Application Form Fields
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Configure candidate input requirements, labels, and toggles without editing code.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Fields List */}
      <div className="rounded-2xl border border-theme-border bg-theme-surface overflow-hidden divide-y divide-theme-border/60 shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-theme-muted">
            Loading configurable fields...
          </div>
        ) : fields.length === 0 ? (
          <div className="p-12 text-center text-xs text-theme-muted">
            No dynamic fields found. Using static defaults.
          </div>
        ) : (
          fields.map((f, idx) => (
            <div
              key={f.id || f.field_key}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-theme-bg/50 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-brand-secondary font-bold px-1.5 py-0.5 rounded bg-brand-secondary/10">
                    {f.field_key}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
                    Type: {f.field_type}
                  </span>
                </div>

                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => handleLabelChange(idx, e.target.value)}
                    className="w-full px-2.5 py-1 text-xs rounded border border-theme-border bg-theme-bg text-theme-heading font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                  />
                </div>
              </div>

              {/* Toggles & Save Button */}
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={f.is_required}
                    onChange={() => handleToggleRequired(idx)}
                    className="rounded border-theme-border text-brand-secondary focus:ring-brand-secondary"
                  />
                  <span className="text-theme-body font-medium">Required</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={f.is_enabled}
                    onChange={() => handleToggleEnabled(idx)}
                    className="rounded border-theme-border text-brand-secondary focus:ring-brand-secondary"
                  />
                  <span className="text-theme-body font-medium">Enabled</span>
                </label>

                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-[11px] gap-1.5"
                  disabled={saving}
                  onClick={() => handleSaveField(f)}
                >
                  <Save className="h-3 w-3" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
