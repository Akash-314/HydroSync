import { NextRequest, NextResponse } from 'next/server';
import { db, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-spam honeypot
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Application received' }, { status: 200 });
    }

    const {
      fullName,
      email,
      phone,
      positionApplied,
      experienceYears,
      portfolioOrLinkedin,
      resumeUrl,
      coverLetter,
    } = body;

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

    if (!positionApplied || positionApplied.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide the position applied for.' }, { status: 400 });
    }

    if (resumeUrl && typeof resumeUrl === 'string' && resumeUrl.trim() !== '') {
      const cleanUrl = resumeUrl.trim();
      if (!cleanUrl.startsWith('https://') && !cleanUrl.startsWith('http://')) {
        return NextResponse.json(
          { success: false, message: 'Resume URL must start with https:// or http://' },
          { status: 400 }
        );
      }
    }

    if (portfolioOrLinkedin && typeof portfolioOrLinkedin === 'string' && portfolioOrLinkedin.trim() !== '') {
      const cleanUrl = portfolioOrLinkedin.trim();
      if (!cleanUrl.startsWith('https://') && !cleanUrl.startsWith('http://')) {
        return NextResponse.json(
          { success: false, message: 'Portfolio/LinkedIn URL must start with https:// or http://' },
          { status: 400 }
        );
      }
    }

    const applicationId = `HS-CAR-${Date.now().toString(36).toUpperCase()}`;

    // Persist to Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      const dbResult = await db.careers({
        application_id: applicationId,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        position_applied: positionApplied.trim(),
        experience_years: experienceYears?.trim() || null,
        portfolio_or_linkedin: portfolioOrLinkedin?.trim() || null,
        resume_url: resumeUrl?.trim() || null,
        cover_letter: coverLetter?.trim() || null,
      });

      if (!dbResult.success && dbResult.error) {
        console.warn('[Careers API] Supabase persistence note:', dbResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your career application has been received. Our engineering talent team will review your profile.',
      applicationId,
    });
  } catch (err) {
    console.error('Careers application error:', err);
    return NextResponse.json({ success: false, message: 'A server error occurred.' }, { status: 500 });
  }
}

