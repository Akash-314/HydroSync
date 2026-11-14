import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession, logAdminActivity } from '@/lib/supabase/auth-guard';
import { getActiveServerClient } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.authenticated) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const client = getActiveServerClient();
  if (!client) {
    return NextResponse.json({
      success: true,
      settings: {
        general: {
          name: siteConfig.name,
          tagline: siteConfig.tagline,
          motto: siteConfig.motto,
          description: siteConfig.description,
          llpNumber: 'AAL-0000',
        },
        contact: siteConfig.contact,
        socials: siteConfig.socials,
        announcement: {
          enabled: false,
          text: 'Summer 2026 Embedded Systems & IoT Internships now open for applications!',
          linkUrl: '/internships',
          linkText: 'Explore Cohorts →',
        },
        seo: {
          defaultTitle: 'HydroSync Innovations LLP | Industrial IoT & Embedded Systems',
          defaultDescription: siteConfig.description,
          keywords: 'IoT, Embedded Systems, FreeRTOS, STM32, Firmware, Engineering Internships',
        },
      },
    });
  }

  try {
    const { data } = await client.from('site_settings').select('*');
    const settingsMap: Record<string, any> = {};

    (data || []).forEach((row) => {
      settingsMap[row.key] = row.value;
    });

    const merged = {
      general: settingsMap.general || {
        name: siteConfig.name,
        tagline: siteConfig.tagline,
        motto: siteConfig.motto,
        description: siteConfig.description,
        llpNumber: 'AAL-0000',
      },
      contact: settingsMap.contact || siteConfig.contact,
      socials: settingsMap.socials || siteConfig.socials,
      announcement: settingsMap.announcement || {
        enabled: false,
        text: 'Summer 2026 Embedded Systems & IoT Internships now open for applications!',
        linkUrl: '/internships',
        linkText: 'Explore Cohorts →',
      },
      seo: settingsMap.seo || {
        defaultTitle: 'HydroSync Innovations LLP | Industrial IoT & Embedded Systems',
        defaultDescription: siteConfig.description,
        keywords: 'IoT, Embedded Systems, FreeRTOS, STM32, Firmware, Engineering Internships',
      },
    };

    return NextResponse.json({ success: true, settings: merged });
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
    const { general, contact, socials, announcement, seo } = body;

    const upserts = [
      { key: 'general', value: general || {}, description: null, updated_at: new Date().toISOString() },
      { key: 'contact', value: contact || {}, description: null, updated_at: new Date().toISOString() },
      { key: 'socials', value: socials || {}, description: null, updated_at: new Date().toISOString() },
      { key: 'announcement', value: announcement || {}, description: null, updated_at: new Date().toISOString() },
      { key: 'seo', value: seo || {}, description: null, updated_at: new Date().toISOString() },
    ];

    for (const item of upserts) {
      await client.from('site_settings').upsert(item, { onConflict: 'key' });
    }

    await logAdminActivity({
      adminId: auth.adminUser.id,
      action: 'update_settings',
      resourceType: 'site_settings',
      resourceId: 'global',
      details: { keys: Object.keys(body) },
    });

    try {
      revalidatePath('/', 'layout');
    } catch {}

    return NextResponse.json({ success: true, message: 'Site settings updated successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
