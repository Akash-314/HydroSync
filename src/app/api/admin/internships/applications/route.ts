import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { getAttachmentSignedUrl } from '@/lib/supabase/storage';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'internship_manager']);
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, applications: [] });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const program = searchParams.get('program');
  const search = searchParams.get('search');
  const resumePath = searchParams.get('resumePath');

  // If requesting a signed download URL for an applicant resume
  if (resumePath) {
    const { url, error } = await getAttachmentSignedUrl(resumePath, 3600);
    if (error || !url) {
      return NextResponse.json({ success: false, message: error || 'Failed to sign URL' }, { status: 400 });
    }
    return NextResponse.json({ success: true, signedUrl: url });
  }

  try {
    let query = client
      .from('internship_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status as any);
    }
    if (program && program !== 'all') {
      query = query.eq('preferred_program', program);
    }
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,college.ilike.%${search}%,application_id.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, applications: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
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
    const { id, newStatus, notes } = body;

    if (!id || !newStatus) {
      return NextResponse.json({ success: false, message: 'Application ID and new status are required' }, { status: 400 });
    }

    // 1. Fetch current status
    const { data: currentApp, error: fetchError } = await client
      .from('internship_applications')
      .select('id, application_id, status, full_name, email')
      .eq('id', id)
      .single();

    if (fetchError || !currentApp) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    const oldStatus = currentApp.status;

    // 2. Update status in internship_applications
    const { data: updatedApp, error: updateError } = await client
      .from('internship_applications')
      .update({
        status: newStatus,
        metadata: {
          last_reviewed_by: auth.adminUser.email,
          last_reviewed_at: new Date().toISOString(),
          internal_notes: notes || null,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ success: false, message: updateError.message }, { status: 400 });
    }

    // 3. Log to application_status_history
    await client.from('application_status_history').insert({
      application_id: currentApp.application_id,
      application_type: 'internship',
      old_status: oldStatus,
      new_status: newStatus,
      changed_by: auth.adminUser.id,
      changed_by_email: auth.adminUser.email,
      notes: notes || null,
    });

    // 4. Log to admin activity
    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'status_change',
      entityType: 'internship_application',
      entityId: currentApp.application_id,
      details: {
        applicant: currentApp.full_name,
        oldStatus,
        newStatus,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      application: updatedApp,
      message: `Applicant status updated from ${oldStatus} to ${newStatus}.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
