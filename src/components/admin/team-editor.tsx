'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { TeamMemberRow } from '@/lib/supabase/types';

export function TeamEditor({
  initialMember,
  isNew = false,
}: {
  initialMember?: Partial<TeamMemberRow> | null;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [fullName, setFullName] = React.useState(initialMember?.full_name || '');
  const [role, setRole] = React.useState(initialMember?.role || '');
  const [department, setDepartment] = React.useState(initialMember?.department || 'Executive Leadership');
  const [bio, setBio] = React.useState(initialMember?.bio || '');
  const [avatarUrl, setAvatarUrl] = React.useState(initialMember?.avatar_url || '');
  const [linkedinUrl, setLinkedinUrl] = React.useState(initialMember?.linkedin_url || '');
  const [displayOrder, setDisplayOrder] = React.useState(initialMember?.display_order || 0);
  const [isActive, setIsActive] = React.useState(initialMember?.is_active ?? true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      full_name: fullName,
      role,
      department,
      bio: bio || null,
      avatar_url: avatarUrl || null,
      linkedin_url: linkedinUrl || null,
      display_order: Number(displayOrder),
      is_active: isActive,
    };

    try {
      const url = isNew ? '/api/admin/team' : `/api/admin/team/${initialMember?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save team member');
      }

      setMessage({ text: isNew ? 'Team member added!' : 'Profile updated!', type: 'success' });
      if (isNew && data.member?.id) {
        router.push(`/admin/team/${data.member.id}`);
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
    if (!initialMember?.id) return;
    if (!confirm('Are you sure you want to remove this team member?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/team/${initialMember.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete member');
      }
      router.push('/admin/team');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <Link href="/admin/team">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
              {isNew ? 'New Team Profile' : 'Edit Member'}
            </span>
            <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
              {isNew ? 'Add Team Member' : fullName}
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
            <span>{loading ? 'Saving...' : 'Save Profile'}</span>
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
              Profile Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Rajesh Kumar"
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Chief Technology Officer"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Executive Leadership / Embedded Systems"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-theme-heading mb-1">
                Professional Bio &amp; Research Interests
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief background on engineering expertise, research, patents, or leadership experience..."
                className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Avatar / Photo URL
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="/team/rajesh.jpg or Supabase URL"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-5 space-y-4">
            <h3 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
              Status &amp; Order
            </h3>

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
                Lower numbers display first in team directory.
              </span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-theme-border bg-theme-bg/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <div>
                  <span className="text-xs font-semibold text-theme-heading block">
                    Active Member
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    Visible on public /team and /about pages.
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
