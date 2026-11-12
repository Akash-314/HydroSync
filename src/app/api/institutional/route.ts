import { NextRequest, NextResponse } from 'next/server';
import { db, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-spam honeypot
    if (body.website_trap && body.website_trap.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Enquiry received' }, { status: 200 });
    }

    const {
      institutionType,
      institutionName,
      contactPerson,
      designation,
      email,
      phone,
      city,
      state,
      programInterest,
      estimatedStudents,
      message,
    } = body;

    if (!institutionName || institutionName.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide institution name.' }, { status: 400 });
    }

    if (!contactPerson || contactPerson.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide contact person name.' }, { status: 400 });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ success: false, message: 'Please provide a valid 10-digit mobile number.' }, { status: 400 });
    }

    const enquiryId = `HS-INST-${Date.now().toString(36).toUpperCase()}`;

    // Persist to Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      const dbResult = await db.institutional({
        enquiry_id: enquiryId,
        institution_type: institutionType || 'college',
        institution_name: institutionName.trim(),
        contact_person: contactPerson.trim(),
        designation: designation?.trim() || null,
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        city: city?.trim() || null,
        state: state?.trim() || null,
        program_interest: programInterest || 'Institutional Partnership',
        estimated_students: estimatedStudents ? Number(estimatedStudents) : null,
        message: message?.trim() || null,
      });

      if (!dbResult.success && dbResult.error) {
        console.warn('[Institutional API] Supabase persistence note:', dbResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your institutional enquiry has been registered. Our academic partnerships team will contact you within 24 hours.',
      enquiryId,
    });
  } catch (err) {
    console.error('Institutional enquiry error:', err);
    return NextResponse.json({ success: false, message: 'A server error occurred.' }, { status: 500 });
  }
}
