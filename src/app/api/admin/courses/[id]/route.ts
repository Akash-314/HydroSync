import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { COURSES_DATA as fallbackCourses } from '@/data/courses';

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
    const fallback = fallbackCourses.find((c) => c.id === id);
    return NextResponse.json({ success: true, course: fallback || null });
  }

  try {
    const { data, error } = await client
      .from('courses')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !data) {
      const fallback = fallbackCourses.find((c) => c.id === id);
      return NextResponse.json({ success: true, course: fallback || null });
    }

    return NextResponse.json({ success: true, course: data });
  } catch {
    const fallback = fallbackCourses.find((c) => c.id === id);
    return NextResponse.json({ success: true, course: fallback || null });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'course_manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();

    const { data, error } = await client
      .from('courses')
      .update({
        title: body.title,
        slug: body.slug,
        category: body.category,
        level: body.level,
        duration_weeks: Number(body.duration_weeks),
        learning_mode: body.learning_mode,
        price_inr: Number(body.price_inr),
        short_description: body.short_description,
        overview: body.overview,
        syllabus: body.syllabus,
        prerequisites: body.prerequisites,
        hardware_tools: body.hardware_tools,
        is_published: body.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    revalidatePath('/courses');
    revalidatePath(`/courses/${body.slug || ''}`);
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'update',
      entityType: 'course',
      entityId: id,
      details: { title: body.title },
    });

    return NextResponse.json({ success: true, course: data });
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
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const { error } = await client.from('courses').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    revalidatePath('/courses');
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'delete',
      entityType: 'course',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Course deleted successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

