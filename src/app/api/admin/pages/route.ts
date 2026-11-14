import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { ALL_PAGES } from '@/lib/constants/pages';

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({
      success: true,
      pages: ALL_PAGES.map((p) => ({ ...p, sectionCount: 0, status: 'published' })),
    });
  }

  try {
    const { data } = await client.from('page_contents').select('page_slug, status, updated_at');
    const counts: Record<string, { count: number; lastUpdated?: string; status: string }> = {};

    (data || []).forEach((row) => {
      if (!counts[row.page_slug]) {
        counts[row.page_slug] = { count: 0, lastUpdated: row.updated_at, status: row.status };
      }
      counts[row.page_slug].count += 1;
      if (row.updated_at > (counts[row.page_slug].lastUpdated || '')) {
        counts[row.page_slug].lastUpdated = row.updated_at;
      }
    });

    const pages = ALL_PAGES.map((p) => ({
      ...p,
      sectionCount: counts[p.slug]?.count || 0,
      status: counts[p.slug]?.status || 'published',
      lastUpdated: counts[p.slug]?.lastUpdated || null,
    }));

    return NextResponse.json({ success: true, pages });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
