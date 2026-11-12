/**
 * HydroSync Innovations LLP — Internship Applications Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertInternshipApplication, InternshipApplicationRow } from '../types';

export async function submitInternshipApplication(
  payload: InsertInternshipApplication
): Promise<DatabaseResponse<InternshipApplicationRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Internship applications cannot be persisted to PostgreSQL.',
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
      .from('internship_applications')
      .insert({
        application_id: payload.application_id,
        full_name: payload.full_name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        college: payload.college.trim(),
        branch: payload.branch.trim(),
        year_of_study: payload.year_of_study,
        area_of_interest: payload.area_of_interest,
        preferred_program: payload.preferred_program,
        preferred_mode: payload.preferred_mode,
        resume_url: payload.resume_url || null,
        additional_message: payload.additional_message || null,
        status: payload.status || 'pending',
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Internship application insertion failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as InternshipApplicationRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during internship application insertion:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}
