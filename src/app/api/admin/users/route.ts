import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

export async function GET() {
  const auth = await verifyAdminSession(['owner', 'super_admin']);
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, users: [] });
  }

  try {
    const { data, error } = await client
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, users: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { email, full_name, role, password } = body;

    if (!email || !role) {
      return NextResponse.json({ success: false, message: 'Email and role are required' }, { status: 400 });
    }

    // 1. Create or invite user in Supabase Auth if password is provided
    let authUserId: string | null = null;
    if (password) {
      const { data: authUser, error: authErr } = await client.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password: password,
        email_confirm: true,
        user_metadata: { full_name, role },
      });

      if (authErr) {
        return NextResponse.json({ success: false, message: authErr.message }, { status: 400 });
      }
      authUserId = authUser?.user?.id || null;
    }

    // 2. Insert into admin_users table
    const { data, error } = await client
      .from('admin_users')
      .insert({
        auth_user_id: authUserId,
        email: email.trim().toLowerCase(),
        full_name: full_name?.trim() || email.split('@')[0],
        role: role,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'create_admin',
      resourceType: 'admin_user',
      resourceId: data.id,
      details: { email: data.email, role: data.role },
    });

    return NextResponse.json({ success: true, user: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
