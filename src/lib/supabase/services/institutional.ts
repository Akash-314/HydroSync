/**
 * HydroSync Innovations LLP — School and College (Institutional) Enquiries Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertInstitutionalEnquiry, InstitutionalEnquiryRow } from '../types';

export async function submitInstitutionalEnquiry(
  payload: InsertInstitutionalEnquiry
): Promise<DatabaseResponse<InstitutionalEnquiryRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Institutional enquiries cannot be persisted to PostgreSQL.',
      isConfigured: false,
    };
  }

  const client = getActiveServerClient();
  if (!client) {
    return {
      success: false,
      data: null,
      error: 'Failed to initialize server-side Supabase client.',
      isConfigured: false,
    };
  }

  try {
    const { data, error } = await client
      .from('institutional_enquiries')
      .insert({
        enquiry_id: payload.enquiry_id,
        institution_type: payload.institution_type,
        institution_name: payload.institution_name.trim(),
        contact_person: payload.contact_person.trim(),
        designation: payload.designation || null,
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        city: payload.city || null,
        state: payload.state || null,
        program_interest: payload.program_interest,
        estimated_students: payload.estimated_students || null,
        message: payload.message || null,
        status: payload.status || 'new',
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Institutional enquiry insertion failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as InstitutionalEnquiryRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during institutional enquiry insertion:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}
