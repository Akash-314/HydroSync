import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { INTERNSHIP_PROGRAMS as fallbackPrograms } from '@/data/internships';

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
    const fallback = fallbackPrograms.find((p) => p.id === id);
    return NextResponse.json({ success: true, program: fallback || null });
  }

  try {
    const { data, error } = await client
      .from('internship_programs')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !data) {
      const fallback = fallbackPrograms.find((p) => p.id === id);
      return NextResponse.json({ success: true, program: fallback || null });
    }

    return NextResponse.json({ success: true, program: data });
  } catch {
    const fallback = fallbackPrograms.find((p) => p.id === id);
    return NextResponse.json({ success: true, program: fallback || null });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'internship_manager']);
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
      .from('internship_programs')
      .update({
        title: body.title,
        slug: body.slug,
        domain: body.domain,
        duration: body.duration,
        mode: body.mode,
        short_description: body.short_description,
        eligibility: body.eligibility,
        learning_outcomes: body.learning_outcomes,
        hardware_exposure: body.hardware_exposure,
        seats_available: Number(body.seats_available),
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
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
      action: 'update',
      entityType: 'internship_program',
      entityId: id,
      details: { title: body.title },
    });

    return NextResponse.json({ success: true, program: data });
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
    const { error } = await client.from('internship_programs').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    revalidatePath('/internships');
    revalidatePath('/apply');
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'delete',
      entityType: 'internship_program',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Internship program deleted successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
