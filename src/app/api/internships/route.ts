import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Anti-spam honeypot check: If the hidden trap field is filled, silently discard
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Application received' },
        { status: 200 }
      );
    }

    const {
      fullName,
      email,
      phone,
      college,
      branch,
      yearOfStudy,
      areaOfInterest,
      preferredProgram,
      preferredMode,
      resumeUrl,
      additionalMessage,
      consent,
    } = body;

    // 2. Strict server-side validation
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
        { success: false, message: 'Please provide your college or institution name.' },
        { status: 400 }
      );
    }

    if (!branch || branch.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Please provide your course or engineering branch.' },
        { status: 400 }
      );
    }

    if (!yearOfStudy) {
      return NextResponse.json(
        { success: false, message: 'Please specify your year of study.' },
        { status: 400 }
      );
    }

    if (!preferredProgram) {
      return NextResponse.json(
        { success: false, message: 'Please select a preferred internship program.' },
        { status: 400 }
      );
    }

    if (!preferredMode) {
      return NextResponse.json(
        { success: false, message: 'Please select a preferred mode (Online, Offline Lab, or Hybrid).' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'You must confirm the details and agree to communication.' },
        { status: 400 }
      );
    }

    const applicationId = `HS-INT-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const applicationPayload = {
      applicationId,
      timestamp,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      college: college.trim(),
      branch: branch.trim(),
      yearOfStudy,
      areaOfInterest: areaOfInterest || preferredProgram,
      preferredProgram,
      preferredMode,
      resumeUrl: resumeUrl?.trim() || null,
      additionalMessage: additionalMessage?.trim() || null,
    };

    // 3. Dispatch to external lead webhook if configured
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationPayload),
        });
      } catch (err) {
        console.error('Webhook dispatch failed:', err);
        // We log and continue so the candidate is not blocked
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your internship application has been successfully submitted and logged.',
        applicationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Internship application error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred while processing your application. Please try again.',
      },
      { status: 500 }
    );
  }
}

