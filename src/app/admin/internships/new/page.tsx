import * as React from 'react';
import { InternshipEditor } from '@/components/admin/internship-editor';

export default function NewInternshipPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
          Nexonix Reflexo Internship System
        </span>
        <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
          Create Internship Program
        </h1>
        <p className="text-xs text-theme-muted mt-1">
          Configure a new technical internship track, hardware workbench tools, and seat quotas.
        </p>
      </div>

      <InternshipEditor isNew />
    </div>
  );
}

