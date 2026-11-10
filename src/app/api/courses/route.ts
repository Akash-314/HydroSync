import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Anti-spam honeypot check
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Enquiry received' },
        { status: 200 }
      );
    }

    const {
      fullName,
      email,
      phone,
      college,
      courseOfInterest,
      learningMode,
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
        { success: false, message: 'Please provide your college or institution name.' },
        { status: 400 }
      );
    }

    if (!courseOfInterest) {
      return NextResponse.json(
        { success: false, message: 'Please select a course of interest.' },
        { status: 400 }
      );
    }

    if (!learningMode) {
      return NextResponse.json(
        { success: false, message: 'Please select your preferred learning mode.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'Please agree to the consent statement to proceed.' },
        { status: 400 }
      );
    }

    const enquiryId = `HS-CRS-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const enquiryPayload = {
      enquiryId,
      timestamp,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      college: college.trim(),
      courseOfInterest,
      learningMode,
      message: message?.trim() || null,
    };

    // 3. Optional webhook dispatch
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enquiryPayload),
        });
      } catch (err) {
        console.error('Course webhook dispatch failed:', err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your course enquiry has been logged successfully. Our admissions team will share the complete syllabus and schedule within 24 hours.',
        enquiryId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Course enquiry error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'A server error occurred while processing your enquiry. Please try again.',
      },
      { status: 500 }
    );
  }
}

