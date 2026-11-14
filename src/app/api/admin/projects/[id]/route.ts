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
      .from('projects')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

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
      .from('projects')
      .update({
        title: body.title,
        slug: body.slug,
        category: body.category,
        client_type: body.client_type,
        problem_statement: body.problem_statement,
        technical_solution: body.technical_solution,
        stack: Array.isArray(body.stack) ? body.stack : [],
        metrics: body.metrics || {},
        image_url: body.image_url,
        featured: body.featured,
        is_published: body.is_published,
        display_order: Number(body.display_order),
        updated_at: new Date().toISOString(),
      })
      .or(`id.eq.${id},slug.eq.${id}`)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'update',
      resourceType: 'project',
      resourceId: data.id,
      details: { title: data.title, slug: data.slug },
    });

    try {
      revalidatePath('/projects');
      revalidatePath('/');
    } catch {}

    return NextResponse.json({ success: true, project: data });
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
      .from('projects')
      .delete()
      .or(`id.eq.${id},slug.eq.${id}`);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'delete',
      resourceType: 'project',
      resourceId: id,
    });

    try {
      revalidatePath('/projects');
      revalidatePath('/');
    } catch {}

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

