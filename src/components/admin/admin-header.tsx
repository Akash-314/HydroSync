'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut, CheckCircle2, Search, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { AdminRole } from '@/lib/supabase/types';

export function AdminHeader({
  adminEmail,
  adminName,
  adminRole = 'manager',
  onOpenSidebar,
}: {
  adminEmail?: string;
  adminName?: string;
  adminRole?: AdminRole;
  onOpenSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userDropdown, setUserDropdown] = React.useState(false);

  // Generate breadcrumb text from pathname
  const segments = (pathname || '')
    .split('/')
    .filter(Boolean)
    .slice(1);

  const title = segments.length === 0
    ? 'Overview Dashboard'
    : segments[0].charAt(0).toUpperCase() + segments[0].slice(1).replace('-', ' ');

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-theme-border/80 bg-theme-surface/90 dark:bg-brand-dark-bg/90 backdrop-blur-md px-4 sm:px-6">
      {/* Left: Hamburger + Page Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg border border-theme-border text-theme-body hover:bg-theme-bg"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-theme-muted font-mono uppercase tracking-wider">
            <span>Portal</span>
            {segments.map((seg, idx) => (
              <React.Fragment key={seg}>
                <span>/</span>
                <span className={idx === segments.length - 1 ? 'text-theme-heading font-semibold' : ''}>
                  {seg}
                </span>
              </React.Fragment>
            ))}
          </div>
          <h2 className="text-base sm:text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Right: Search, Status, ThemeToggle, User Avatar Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Supabase Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connected</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdown(!userDropdown)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-theme-border/80 hover:bg-theme-bg transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-primary/10 text-brand-primary dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure font-bold text-xs">
              {(adminName || 'Admin').charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-theme-heading leading-none">
                {adminName || 'Administrator'}
              </span>
              <span className="text-[10px] text-theme-muted leading-none mt-0.5">
                {adminRole.replace('_', ' ')}
              </span>
            </div>
          </button>

          {userDropdown && (
            <>
              <div
                onClick={() => setUserDropdown(false)}
                className="fixed inset-0 z-40"
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-theme-border bg-theme-surface dark:bg-brand-dark-surface p-2 shadow-xl z-50">
                <div className="px-3 py-2 border-b border-theme-border/60">
                  <p className="text-xs font-bold text-theme-heading">
                    {adminName || 'Administrator'}
                  </p>
                  <p className="text-[11px] text-theme-muted truncate mt-0.5">
                    {adminEmail || 'manager@hydrosync.in'}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

