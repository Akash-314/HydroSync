import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';

const ALLOWED_BUCKETS = ['public-assets', 'project-media', 'gallery', 'application-attachments'];

export async function GET(req: NextRequest) {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, files: [] });
  }

  const { searchParams } = new URL(req.url);
  const bucket = searchParams.get('bucket') || 'public-assets';
  const folder = searchParams.get('folder') || '';

  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ success: false, message: 'Invalid storage bucket' }, { status: 400 });
  }

  try {
    const { data, error } = await client.storage
      .from(bucket)
      .list(folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    const files = (data || []).map((f) => {
      const path = folder ? `${folder}/${f.name}` : f.name;
      const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(path);
      return {
        ...f,
        path,
        url: publicUrlData?.publicUrl || '',
      };
    });

    return NextResponse.json({ success: true, bucket, files });
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
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'public-assets';
    const folder = (formData.get('folder') as string) || '';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_BUCKETS.includes(bucket)) {
      return NextResponse.json({ success: false, message: 'Invalid bucket' }, { status: 400 });
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || '';
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const fileName = `${cleanBase}-${Date.now()}.${ext}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data, error } = await client.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(filePath);

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'upload',
      resourceType: 'storage_file',
      resourceId: filePath,
      details: { bucket, size: file.size, mime: file.type },
    });

    return NextResponse.json({
      success: true,
      file: {
        path: filePath,
        url: publicUrlData?.publicUrl || '',
        name: fileName,
        size: file.size,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const { bucket, path } = await req.json();
    if (!bucket || !path || !ALLOWED_BUCKETS.includes(bucket)) {
      return NextResponse.json({ success: false, message: 'Invalid bucket or path' }, { status: 400 });
    }

    const { error } = await client.storage.from(bucket).remove([path]);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'delete',
      resourceType: 'storage_file',
      resourceId: path,
      details: { bucket },
    });

    return NextResponse.json({ success: true, message: 'File deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

