import { NextRequest, NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/supabase/server-auth';
import { getSupabaseAdminClient } from '@/lib/supabase/server';
import { logAdminActivity } from '@/lib/supabase/auth-guard';
import type { AdminRole } from '@/lib/supabase/types';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const supabase = await createAdminServerClient();
    const privilegedClient = getSupabaseAdminClient() || supabase;

    // 1. Sign up user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          full_name: cleanName,
        },
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, message: authError?.message || 'Failed to register account.' },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    // 2. Check if this is the primary owner or if admin_users is currently empty (first bootstrap user)
    const isOwnerEmail = cleanEmail === 'akvines944@gmail.com' || cleanEmail.includes('director@hydrosync.in');

    let totalAdmins = 0;
    try {
      const { count } = await privilegedClient
        .from('admin_users')
        .select('id', { count: 'exact', head: true });
      totalAdmins = count || 0;
    } catch {
      totalAdmins = 0;
    }

    const shouldGrantOwner = isOwnerEmail || (totalAdmins === 0);

    let assignedRole: AdminRole = 'manager';
    if (shouldGrantOwner) {
      assignedRole = 'owner';
    }

    // 3. Upsert into public.admin_users
    try {
      await privilegedClient.from('admin_users').upsert(
        {
          id: userId,
          email: cleanEmail,
          full_name: cleanName,
          role: assignedRole,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

      await logAdminActivity({
        adminId: userId,
        adminEmail: cleanEmail,
        action: 'register',
        resourceType: 'auth',
        details: { role: assignedRole },
      });
    } catch (dbErr) {
      console.warn('[Register] admin_users record warning:', dbErr);
    }

    // 4. Ensure active sign-in session
    if (!authData.session) {
      await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Account successfully registered and authenticated.',
      user: {
        id: userId,
        email: cleanEmail,
        fullName: cleanName,
        role: assignedRole,
      },
      redirect: shouldGrantOwner ? '/admin' : '/',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error during registration';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
