import { NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/supabase/server-auth';

export async function POST() {
  try {
    const supabase = await createAdminServerClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true, redirect: '/admin/login' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error logging out.';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

