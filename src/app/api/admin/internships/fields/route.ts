import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

export async function GET() {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'internship_manager']);
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, fields: [] });
  }

  try {
    const { data, error } = await client
      .from('internship_form_fields')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, fields: data || [] });
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
    const { field_key, label, field_type, placeholder, help_text, is_required, options, display_order, is_enabled } = body;

    const { data, error } = await client
      .from('internship_form_fields')
      .insert({
        field_key: field_key.trim(),
        label: label.trim(),
        field_type,
        placeholder: placeholder || null,
        help_text: help_text || null,
        is_required: is_required ?? true,
        options: options || [],
        display_order: Number(display_order) || 0,
        is_enabled: is_enabled ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      adminEmail: auth.adminUser.email,
      action: 'create',
      entityType: 'form_field',
      entityId: data.id,
      details: { field_key, label },
    });

    return NextResponse.json({ success: true, field: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
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
    const { id, label, is_required, is_enabled, display_order, placeholder, help_text, options } = body;

    const { data, error } = await client
      .from('internship_form_fields')
      .update({
        label,
        is_required,
        is_enabled,
        display_order: Number(display_order),
        placeholder,
        help_text,
        options,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, field: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
