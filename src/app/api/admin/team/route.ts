import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, team: [] });
  }

  try {
    const { data, error } = await client
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, team: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const {
      full_name,
      role,
      department,
      bio,
      avatar_url,
      linkedin_url,
      display_order,
      is_active,
    } = body;

    const { data, error } = await client
      .from('team_members')
      .insert({
        full_name: full_name.trim(),
        role: role.trim(),
        department: department || 'Engineering',
        bio: bio || null,
        avatar_url: avatar_url || null,
        linkedin_url: linkedin_url || null,
        display_order: Number(display_order) || 0,
        is_active: is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'create',
      resourceType: 'team_member',
      resourceId: data.id,
      details: { full_name: data.full_name, role: data.role },
    });

    try {
      revalidatePath('/team');
      revalidatePath('/about');
    } catch {}

    return NextResponse.json({ success: true, member: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

