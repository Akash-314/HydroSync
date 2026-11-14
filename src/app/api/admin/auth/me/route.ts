import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/supabase/auth-guard';

export async function GET() {
  const result = await verifyAdminSession();
  if (!result.authenticated || !result.adminUser) {
    return NextResponse.json(
      { authenticated: false, error: result.error || 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: result.adminUser.id,
      email: result.adminUser.email,
      fullName: result.adminUser.full_name,
      role: result.adminUser.role,
      lastSignInAt: result.adminUser.last_sign_in_at,
    },
  });
}

