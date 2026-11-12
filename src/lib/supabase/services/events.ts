/**
 * HydroSync Innovations LLP — Event Registrations Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertEventRegistration, EventRegistrationRow } from '../types';

export async function submitEventRegistration(
  payload: InsertEventRegistration
): Promise<DatabaseResponse<EventRegistrationRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Event registrations cannot be persisted to PostgreSQL.',
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
      .from('event_registrations')
      .insert({
        registration_id: payload.registration_id,
        full_name: payload.full_name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        college: payload.college.trim(),
        event_or_class: payload.event_or_class,
        session_type: payload.session_type || 'Event',
        number_of_attendees: payload.number_of_attendees || 1,
        message: payload.message || null,
        status: payload.status || 'registered',
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Event registration insertion failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as EventRegistrationRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during event registration insertion:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}

