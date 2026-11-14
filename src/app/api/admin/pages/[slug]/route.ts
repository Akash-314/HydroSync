import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { ALL_PAGES } from '@/lib/constants/pages';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const pageMeta = ALL_PAGES.find((p) => p.slug === slug);
  if (!pageMeta) {
    return NextResponse.json({ success: false, message: 'Page not found' }, { status: 404 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: true, page: pageMeta, sections: [], revisions: [] });
  }

  try {
    const { data: sections } = await client
      .from('page_contents')
      .select('*')
      .eq('page_slug', slug)
      .order('display_order', { ascending: true });

    const { data: revisions } = await client
      .from('content_revisions')
      .select('*')
      .eq('page_slug', slug)
      .order('version_number', { ascending: false })
      .limit(20);

    return NextResponse.json({
      success: true,
      page: pageMeta,
      sections: sections || [],
      revisions: revisions || [],
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await verifyAdminSession(['owner', 'super_admin', 'manager', 'content_editor']);
  if (!auth.authenticated || !auth.adminUser) {
    return NextResponse.json({ success: false, message: auth.error || 'Forbidden' }, { status: 403 });
  }

  const { slug } = await params;
  const pageMeta = ALL_PAGES.find((p) => p.slug === slug);
  if (!pageMeta) {
    return NextResponse.json({ success: false, message: 'Page not found' }, { status: 404 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({ success: false, message: 'Database client unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { sections, status } = body;

    if (!Array.isArray(sections)) {
      return NextResponse.json({ success: false, message: 'Sections array required' }, { status: 400 });
    }

    // 1. Get latest version number for revision log
    const { data: latestRev } = await client
      .from('content_revisions')
      .select('version_number')
      .eq('page_slug', slug)
      .order('version_number', { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextVersion = (latestRev?.version_number || 0) + 1;

    // 2. Save revision snapshot
    await client.from('content_revisions').insert({
      page_slug: slug,
      section_key: 'all',
      version_number: nextVersion,
      snapshot: { sections, status, saved_at: new Date().toISOString() },
      created_by: auth.adminUser.email,
    });

    // 3. Upsert sections
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      await client.from('page_contents').upsert(
        {
          id: sec.id || undefined,
          page_slug: slug,
          section_key: sec.section_key || `section_${i}`,
          title: sec.title || null,
          subtitle: sec.subtitle || null,
          content: sec.content || null,
          media_url: sec.media_url || null,
          cta_text: sec.cta_text || null,
          cta_url: sec.cta_url || null,
          secondary_cta_text: sec.secondary_cta_text || null,
          secondary_cta_url: sec.secondary_cta_url || null,
          extra_data: sec.extra_data || {},
          display_order: i,
          is_published: sec.is_published ?? true,
          status: status || 'published',
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: 'page_slug,section_key' }
      );
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'update_page_content',
      resourceType: 'page_content',
      resourceId: slug,
      details: { version: nextVersion, sectionsCount: sections.length },
    });

    // 4. Revalidate public page
    try {
      revalidatePath(pageMeta.path);
      revalidatePath('/');
    } catch {}

    return NextResponse.json({ success: true, message: 'Page content updated successfully', version: nextVersion });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
