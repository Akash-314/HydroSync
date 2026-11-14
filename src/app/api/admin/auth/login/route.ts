import { NextRequest, NextResponse } from 'next/server';
import { createAdminServerClient } from '@/lib/supabase/server-auth';
import { getSupabaseAdminClient } from '@/lib/supabase/server';
import { logAdminActivity } from '@/lib/supabase/auth-guard';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = await createAdminServerClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, message: authError?.message || 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Verify user is in admin_users and active
    const cleanEmail = email.trim().toLowerCase();
    const privilegedClient = getSupabaseAdminClient() || supabase;
    let { data: adminUser } = await privilegedClient
      .from('admin_users')
      .select('*')
      .or(`id.eq.${authData.user.id},email.eq.${cleanEmail}`)
      .eq('is_active', true)
      .maybeSingle();

    // Special auto-bootstrap for owner akvines944@gmail.com
    if (!adminUser && cleanEmail === 'akvines944@gmail.com') {
      const { data: newOwner } = await privilegedClient
        .from('admin_users')
        .upsert(
          {
            id: authData.user.id,
            email: cleanEmail,
            full_name: 'Akash V (Owner)',
            role: 'owner',
            is_active: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        )
        .select()
        .single();
      adminUser = newOwner;
    }

    if (!adminUser) {
      // Sign out immediately if not authorized as admin
      await supabase.auth.signOut();
      return NextResponse.json(
        {
          success: false,
          message: 'Access denied. This account does not possess administrator privileges.',
        },
        { status: 403 }
      );
    }

    // Ensure auth_user_id is synced
    if (adminUser.id !== authData.user.id) {
      await privilegedClient
        .from('admin_users')
        .update({ id: authData.user.id, updated_at: new Date().toISOString() })
        .eq('email', cleanEmail);
    } else {
      // Update last activity timestamp
      await privilegedClient
        .from('admin_users')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', authData.user.id);
    }

    // Record audit log
    await logAdminActivity({
      adminId: authData.user.id,
      adminEmail: authData.user.email || email,
      action: 'login',
      entityType: 'auth',
      details: { role: adminUser.role },
    });

    return NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName: adminUser.full_name,
        role: adminUser.role,
      },
      redirect: '/admin',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server authentication error.';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

