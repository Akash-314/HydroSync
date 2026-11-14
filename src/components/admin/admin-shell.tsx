'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // If on login route, render without administrative shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-theme-bg text-theme-body antialiased">
      {/* Sidebar */}
      <AdminSidebar
        currentRole={adminUser?.role || 'manager'}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          adminEmail={adminUser?.email}
          adminName={adminUser?.fullName}
          adminRole={adminUser?.role || 'manager'}
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

