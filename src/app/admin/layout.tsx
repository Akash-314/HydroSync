import type { Metadata } from 'next';
import { verifyAdminSession } from '@/lib/supabase/auth-guard';
import { AdminShell } from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: 'HydroSync Portal | Content & Business Management',
  description: 'Enterprise administration system for HydroSync Innovations LLP.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  const adminUserData = session.authenticated && session.adminUser
    ? {
        email: session.adminUser.email,
        fullName: session.adminUser.full_name,
        role: session.adminUser.role,
      }
    : null;

  return <AdminShell adminUser={adminUserData}>{children}</AdminShell>;
}

