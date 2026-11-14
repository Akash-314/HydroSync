'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';
import { Button } from '@/components/ui/button';
import type { AdminRole } from '@/lib/supabase/types';

export function AdminShell({
  children,
  adminUser,
}: {
  children: React.ReactNode;
  adminUser?: {
    email: string;
    fullName: string;
    role: AdminRole;
  } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // If on login route, render without administrative shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If user is not authenticated as an admin, guard the entire admin area
  if (!adminUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-theme-bg text-theme-body text-center">
        <div className="max-w-md w-full bg-theme-surface dark:bg-brand-dark-surface border border-theme-border dark:border-brand-dark-border rounded-2xl p-8 shadow-2xl">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4 border border-amber-500/20">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-theme-heading">
            Admin Authentication Required
          </h2>
          <p className="mt-2 text-sm text-theme-muted leading-relaxed">
            You must be signed in with an authorized staff or management account to view and edit HydroSync Portal resources.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              href={`/admin/login?redirect=${encodeURIComponent(pathname)}`}
              variant="primary"
              className="w-full justify-center"
            >
              <span>Sign In to Admin Portal</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              href={`/signup?redirect=${encodeURIComponent(pathname)}`}
              variant="outline"
              className="w-full justify-center"
            >
              <span>Create / Register Account</span>
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-theme-border text-xs text-theme-muted">
            Logging in as <span className="font-mono text-theme-heading font-medium">akvines944@gmail.com</span> automatically grants Owner permissions.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-theme-bg text-theme-body antialiased">
      {/* Sidebar */}
      <AdminSidebar
        currentRole={adminUser.role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          adminEmail={adminUser.email}
          adminName={adminUser.fullName}
          adminRole={adminUser.role}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

