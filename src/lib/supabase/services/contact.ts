/**
 * HydroSync Innovations LLP — Contact Enquiries Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertContactEnquiry, ContactEnquiryRow } from '../types';

export async function submitContactEnquiry(
  payload: InsertContactEnquiry
): Promise<DatabaseResponse<ContactEnquiryRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Submissions cannot be persisted to PostgreSQL.',
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
      .from('contact_enquiries')
      .insert({
        full_name: payload.full_name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        category: payload.category,
        message: payload.message.trim(),
        status: payload.status || 'new',
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Contact enquiry insertion failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as ContactEnquiryRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during contact enquiry insertion:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}
