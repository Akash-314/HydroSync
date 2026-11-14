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
    return NextResponse.json({ success: true, projects: [] });
  }

  try {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, projects: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'content_editor']);
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
      title,
      slug,
      category,
      client_type,
      problem_statement,
      technical_solution,
      stack,
      metrics,
      image_url,
      featured,
      is_published,
      display_order,
    } = body;

    const { data, error } = await client
      .from('projects')
      .insert({
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        category: category || 'Industrial IoT',
        client_type: client_type || null,
        problem_statement: problem_statement || '',
        technical_solution: technical_solution || '',
        stack: Array.isArray(stack) ? stack : [],
        metrics: metrics || {},
        image_url: image_url || null,
        featured: featured ?? false,
        is_published: is_published ?? true,
        display_order: Number(display_order) || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'create',
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

