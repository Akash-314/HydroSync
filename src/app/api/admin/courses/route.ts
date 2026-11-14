import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { COURSES_DATA as fallbackCourses } from '@/data/courses';

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, courses: fallbackCourses });
  }

  try {
    const { data, error } = await client
      .from('courses')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, courses: fallbackCourses });
    }

    return NextResponse.json({ success: true, courses: data });
  } catch {
    return NextResponse.json({ success: true, courses: fallbackCourses });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'course_manager']);
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
      level,
      duration_weeks,
      learning_mode,
      price_inr,
      short_description,
      overview,
      syllabus,
      prerequisites,
      hardware_tools,
      is_published,
    } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ success: false, message: 'Title, slug and category are required' }, { status: 400 });
    }

    const { data, error } = await client
      .from('courses')
      .insert({
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        category,
        level: level || 'Beginner',
        duration_weeks: Number(duration_weeks) || 4,
        learning_mode: learning_mode || 'Hybrid',
        price_inr: Number(price_inr) || 0,
        short_description: short_description || '',
        overview: overview || '',
        syllabus: syllabus || [],
        prerequisites: prerequisites || [],
        hardware_tools: hardware_tools || [],
        is_published: is_published ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    // On-demand revalidation of public pages
    revalidatePath('/courses');
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'create',
      entityType: 'course',
      entityId: data.id,
      details: { title, slug },
    });

    return NextResponse.json({ success: true, course: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

