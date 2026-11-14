'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Briefcase,
  Users2,
  Calendar,
  FolderGit2,
  Image as ImageIcon,
  BookOpen,
  Inbox,
  HardDrive,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminRole } from '@/lib/supabase/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  roles?: AdminRole[];
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Page Management',
    href: '/admin/pages',
    icon: FileText,
  },
  {
    label: 'Courses & Batches',
    href: '/admin/courses',
    icon: GraduationCap,
  },
  {
    label: 'Internship Portal',
    href: '/admin/internships',
    icon: Briefcase,
    children: [
      { label: 'Programs Catalog', href: '/admin/internships' },
      { label: 'Candidate Pipeline', href: '/admin/internships/applications' },
      { label: 'Form Field Config', href: '/admin/internships/fields' },
    ],
  },
  {
    label: 'Events & Workshops',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    label: 'Projects Showcase',
    href: '/admin/projects',
    icon: FolderGit2,
  },
  {
    label: 'Team Directory',
    href: '/admin/team',
    icon: Users2,
  },
  {
    label: 'Gallery Media',
    href: '/admin/gallery',
    icon: ImageIcon,
  },
  {
    label: 'Blog & Insights',
    href: '/admin/blog',
    icon: BookOpen,
  },
  {
    label: 'Submissions Inbox',
    href: '/admin/submissions',
    icon: Inbox,
  },
  {
    label: 'Media Library',
    href: '/admin/media',
    icon: HardDrive,
  },
  {
    label: 'Website Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['owner', 'super_admin', 'manager'],
  },
  {
    label: 'Team & Roles',
    href: '/admin/team-access',
    icon: ShieldAlert,
    roles: ['owner', 'super_admin'],
  },
];

export function AdminSidebar({
  currentRole = 'manager',
  isOpen,
  onClose,
}: {
  currentRole?: AdminRole;
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [internshipOpen, setInternshipOpen] = React.useState(
    pathname?.startsWith('/admin/internships')
  );

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      window.location.href = '/admin/login';
    }
  };

  const isSuper = currentRole === 'owner' || currentRole === 'super_admin';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-theme-border/80 bg-theme-surface dark:bg-brand-dark-bg transition-transform duration-200 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Top Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-theme-border/70">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border/80 p-0.5 shadow-xs">
              <Image
                src="/images/logo/hydrosync-logo-mark.png"
                alt="HydroSync Logo Mark"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-theme-heading leading-tight">
                HydroSync
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-yellow leading-none mt-0.5">
                Admin Portal
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-theme-muted hover:text-theme-heading hover:bg-theme-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role Pill Banner */}
        <div className="px-5 py-2.5 bg-brand-light-bg/60 dark:bg-brand-dark-surface/50 border-b border-theme-border/50 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
            Privilege Level
          </span>
          <span
            className={cn(
              'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider',
              isSuper
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
            )}
          >
            {currentRole.replace('_', ' ')}
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            // Check role visibility
            if (item.roles && !item.roles.includes(currentRole) && !isSuper) {
              return null;
            }

            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(item.href);

            if (item.children) {
              return (
                <div key={item.href} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setInternshipOpen(!internshipOpen)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-brand-primary/10 text-brand-primary dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure'
                        : 'text-theme-body hover:bg-theme-bg hover:text-theme-heading'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-150',
                        internshipOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {internshipOpen && (
                    <div className="pl-8 pr-2 py-1 space-y-1">
                      {item.children.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={onClose}
                            className={cn(
                              'block px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors',
                              isSubActive
                                ? 'bg-brand-secondary/15 text-brand-secondary dark:text-brand-midnight-yellow font-bold'
                                : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-brand-secondary/15 text-brand-secondary dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure font-bold'
                    : 'text-theme-body hover:bg-theme-bg hover:text-theme-heading'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-theme-border/70 space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-theme-muted hover:text-theme-heading hover:bg-theme-bg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Public Site</span>
            </span>
            <span className="text-[10px] text-theme-muted/80">hydrosync.in</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

