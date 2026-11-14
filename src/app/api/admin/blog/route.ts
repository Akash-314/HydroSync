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
    return NextResponse.json({ success: true, posts: [] });
  }

  try {
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, posts: data || [] });
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
      excerpt,
      content,
      cover_image_url,
      author_name,
      category,
      tags,
      read_time_minutes,
      is_published,
    } = body;

    const { data, error } = await client
      .from('blog_posts')
      .insert({
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        excerpt: excerpt || '',
        content: content || '',
        cover_image_url: cover_image_url || null,
        author_name: author_name || 'HydroSync Engineering Team',
        category: category || 'Engineering',
        tags: Array.isArray(tags) ? tags : [],
        read_time_minutes: Number(read_time_minutes) || 5,
        is_published: is_published ?? true,
        published_at: is_published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'create',
      resourceType: 'blog_post',
      resourceId: data.id,
      details: { title: data.title, slug: data.slug },
    });

    try {
      revalidatePath('/blog');
    } catch {}

    return NextResponse.json({ success: true, post: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
