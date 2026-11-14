import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { INTERNSHIP_PROGRAMS as fallbackPrograms } from '@/data/internships';

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, programs: fallbackPrograms });
  }

  try {
    const { data, error } = await client
      .from('internship_programs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, programs: fallbackPrograms });
    }

    return NextResponse.json({ success: true, programs: data });
  } catch {
    return NextResponse.json({ success: true, programs: fallbackPrograms });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'internship_manager']);
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
      domain,
      duration,
      mode,
      short_description,
      eligibility,
      learning_outcomes,
      hardware_exposure,
      seats_available,
      is_active,
    } = body;

    if (!title || !slug || !domain) {
      return NextResponse.json({ success: false, message: 'Title, slug, and domain are required' }, { status: 400 });
    }

    const { data, error } = await client
      .from('internship_programs')
      .insert({
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        domain: domain.trim(),
        duration: duration || '4-8 Weeks',
        mode: mode || 'Hybrid',
        short_description: short_description || '',
        eligibility: eligibility || 'Engineering / Polytechnic Students',
        learning_outcomes: learning_outcomes || [],
        hardware_exposure: hardware_exposure || [],
        seats_available: Number(seats_available) || 30,
        is_active: is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    revalidatePath('/internships');
    revalidatePath('/apply');
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'create',
      entityType: 'internship_program',
      entityId: data.id,
      details: { title, slug },
    });

    return NextResponse.json({ success: true, program: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
