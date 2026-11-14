import { NextRequest, NextResponse } from 'next/server';
import { db, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Anti-spam honeypot check
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Registration received' },
        { status: 200 }
      );
    }

    const {
      fullName,
      email,
      phone,
      college,
      eventOrClass,
      sessionType,
      numberOfAttendees,
      message,
      consent,
    } = body;

    // 2. Strict validation
    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide your full legal name.' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    if (!college || college.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Please provide your college or organization name.' },
        { status: 400 }
      );
    }

    if (!eventOrClass) {
      return NextResponse.json(
        { success: false, message: 'Please select the event or live masterclass.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'Please accept the consent checkbox to complete registration.' },
        { status: 400 }
      );
    }

    const registrationId = `HS-EVT-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const registrationPayload = {
      registrationId,
      timestamp,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      college: college.trim(),
      eventOrClass,
      sessionType: sessionType || 'Event',
      numberOfAttendees: numberOfAttendees || 1,
      message: message?.trim() || null,
    };

    // 3. Persist to Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      const dbResult = await db.events({
        registration_id: registrationId,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        college: college.trim(),
        event_or_class: eventOrClass,
        session_type: (sessionType as 'Event' | 'Masterclass' | 'Workshop' | 'Webinar') || 'Event',
        number_of_attendees: numberOfAttendees || 1,
        message: message?.trim() || null,
      });

      if (!dbResult.success && dbResult.error) {
        console.warn('[Events API] Supabase persistence note:', dbResult.error);
      }
    }

    // 4. Optional webhook dispatch
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationPayload),
        });
      } catch (err) {
        console.error('Event webhook dispatch failed:', err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your registration has been logged successfully. Joining instructions, venue logistics, and preparation guides will be emailed within 24 hours.',
        registrationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred while processing your registration. Please try again.',
      },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const { getActiveServerClient } = await import('@/lib/supabase/server');
    const client = getActiveServerClient();
    if (client) {
      const { data, error } = await client
        .from('events')
        .select('*')
        .eq('is_open', true)
        .order('start_date', { ascending: true });

      if (!error && data) {
        return NextResponse.json({ success: true, events: data });
      }
    }

    return NextResponse.json({ success: true, events: [] });
  } catch (err: unknown) {
    return NextResponse.json({ success: true, events: [] });
  }
}
