import { NextRequest, NextResponse } from 'next/server';
import { db, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-spam honeypot
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Enquiry received' }, { status: 200 });
    }

    const { fullName, email, phone, category, message } = body;

    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide your full legal name.' }, { status: 400 });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ success: false, message: 'Please provide a valid 10-digit mobile number.' }, { status: 400 });
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json({ success: false, message: 'Please provide message details.' }, { status: 400 });
    }

    // Persist to Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      const dbResult = await db.contact({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        category: category || 'Other',
        message: message.trim(),
      });

      if (!dbResult.success && dbResult.error) {
        console.warn('[Contact API] Supabase persistence note:', dbResult.error);
      }
    }

    // Optional webhook dispatch
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact_enquiry',
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: cleanPhone,
            category: category || 'Other',
            message: message.trim(),
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error('Contact enquiry webhook dispatch failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been successfully registered. Our team will contact you shortly.',
    });
  } catch (err) {
    console.error('Contact enquiry error:', err);
    return NextResponse.json({ success: false, message: 'A server error occurred.' }, { status: 500 });
  }
}
