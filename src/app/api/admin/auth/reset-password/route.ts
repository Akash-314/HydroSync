import { NextRequest, NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/supabase/server-auth';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 });
    }

    const supabase = await createAdminServerClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${siteUrl}/admin/reset-password`,
    });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset link dispatched if the email is registered.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

