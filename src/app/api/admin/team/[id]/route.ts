import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Client unavailable' }, { status: 500 });
  }

  try {
    const { data, error } = await client
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, message: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, member: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();

    const { data, error } = await client
      .from('team_members')
      .update({
        full_name: body.full_name,
        role: body.role,
        department: body.department,
        bio: body.bio || null,
        avatar_url: body.avatar_url || null,
        linkedin_url: body.linkedin_url || null,
        display_order: Number(body.display_order),
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'update',
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Client unavailable' }, { status: 500 });
  }

  try {
    const { error } = await client
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'delete',
      resourceType: 'team_member',
      resourceId: id,
    });

    try {
      revalidatePath('/team');
      revalidatePath('/about');
    } catch {}

    return NextResponse.json({ success: true, message: 'Team member deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
