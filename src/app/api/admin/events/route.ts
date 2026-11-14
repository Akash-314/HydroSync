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
    return NextResponse.json({ success: true, events: [] });
  }

  try {
    const { data, error } = await client
      .from('events')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, events: data || [] });
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
      title,
      slug,
      event_type,
      start_date,
      end_date,
      venue,
      mode,
      speaker_name,
      speaker_title,
      description,
      max_seats,
      is_open,
    } = body;

    const { data, error } = await client
      .from('events')
      .insert({
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        event_type: event_type || 'Workshop',
        start_date,
        end_date: end_date || null,
        venue: venue || 'HydroSync IoT Lab / Online',
        mode: mode || 'Hybrid',
        speaker_name: speaker_name || null,
        speaker_title: speaker_title || null,
        description: description || '',
        max_seats: Number(max_seats) || 50,
        is_open: is_open ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    revalidatePath('/events');
    revalidatePath('/');

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'create',
      entityType: 'event',
      entityId: data.id,
      details: { title, slug },
    });

    return NextResponse.json({ success: true, event: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
