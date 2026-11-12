/**
 * HydroSync Innovations LLP — Career Applications Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertCareerApplication, CareerApplicationRow } from '../types';

export async function submitCareerApplication(
  payload: InsertCareerApplication
): Promise<DatabaseResponse<CareerApplicationRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Career applications cannot be persisted to PostgreSQL.',
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
      .from('career_applications')
      .insert({
        application_id: payload.application_id,
        full_name: payload.full_name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        position_applied: payload.position_applied.trim(),
        experience_years: payload.experience_years || null,
        portfolio_or_linkedin: payload.portfolio_or_linkedin || null,
        resume_url: payload.resume_url || null,
        cover_letter: payload.cover_letter || null,
        status: payload.status || 'received',
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Career application insertion failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as CareerApplicationRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during career application insertion:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}

