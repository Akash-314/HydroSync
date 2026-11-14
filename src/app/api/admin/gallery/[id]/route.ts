import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'content_editor']);
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
      .from('gallery_items')
      .update({
        title: body.title,
        category: body.category,
        image_url: body.image_url,
        caption: body.caption || null,
        display_order: Number(body.display_order),
        is_published: body.is_published,
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
      resourceType: 'gallery_item',
      resourceId: data.id,
      details: { title: data.title },
    });

    try {
      revalidatePath('/gallery');
    } catch {}

    return NextResponse.json({ success: true, item: data });
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
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'delete',
      resourceType: 'gallery_item',
      resourceId: id,
    });

    try {
      revalidatePath('/gallery');
    } catch {}

    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
