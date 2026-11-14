import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

const TABLE_MAP: Record<string, string> = {
  contact: 'contact_enquiries',
  courses: 'course_enquiries',
  internships: 'internship_applications',
  events: 'event_registrations',
  institutional: 'institutional_enquiries',
  careers: 'career_applications',
  newsletter: 'newsletter_subscriptions',
};

export async function GET(req: NextRequest) {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, items: [], counts: {} });
  }

  const { searchParams } = new URL(req.url);
  const stream = searchParams.get('stream') || 'contact';
  const query = searchParams.get('q') || '';
  const status = searchParams.get('status') || '';

  try {
    // 1. Fetch counts across all 7 streams for tabs
    const counts: Record<string, number> = {};
    for (const [key, tbl] of Object.entries(TABLE_MAP)) {
      try {
        const { count } = await client.from(tbl as any).select('*', { count: 'exact', head: true });
        counts[key] = count || 0;
      } catch {
        counts[key] = 0;
      }
    }

    // 2. Fetch specific stream data
    const tableName = TABLE_MAP[stream] || TABLE_MAP.contact;
    let dbQuery = client.from(tableName as any).select('*').order('created_at', { ascending: false }).limit(200);

    if (status && status !== 'all' && tableName !== 'newsletter_subscriptions' && tableName !== 'event_registrations') {
      dbQuery = dbQuery.eq('status', status);
    }

    const { data, error } = await dbQuery;
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    let items = data || [];
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((row: any) => {
        const name = (row.full_name || row.institution_name || '').toLowerCase();
        const email = (row.email || '').toLowerCase();
        const phone = (row.phone || '').toLowerCase();
        const message = (row.message || row.domain || row.course_name || '').toLowerCase();
        return name.includes(q) || email.includes(q) || phone.includes(q) || message.includes(q);
      });
    }

    return NextResponse.json({ success: true, stream, items, counts });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'course_manager', 'internship_manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { stream, id, status, admin_notes } = body;
    const tableName = TABLE_MAP[stream];

    if (!tableName || !id) {
      return NextResponse.json({ success: false, message: 'Invalid stream or id' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (status !== undefined) updatePayload.status = status;
    if (admin_notes !== undefined) updatePayload.admin_notes = admin_notes;

    const { data, error } = await client
      .from(tableName as any)
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'update_status',
      resourceType: stream,
      resourceId: id,
      details: { status, admin_notes },
    });

    return NextResponse.json({ success: true, item: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
