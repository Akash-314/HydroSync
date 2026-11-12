import { NextRequest, NextResponse } from 'next/server';
import { db, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, sourcePage } = body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Persist to Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      const dbResult = await db.newsletter({
        email: cleanEmail,
        source_page: sourcePage || 'website',
      });

      if (!dbResult.success && dbResult.error) {
        console.warn('[Newsletter API] Supabase persistence note:', dbResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to HydroSync technical insights!',
    });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json({ success: false, message: 'A server error occurred.' }, { status: 500 });
  }
}
