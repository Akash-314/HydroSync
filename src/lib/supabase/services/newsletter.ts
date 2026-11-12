/**
 * HydroSync Innovations LLP — Newsletter Subscriptions Database Service
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type { DatabaseResponse, InsertNewsletterSubscription, NewsletterSubscriptionRow } from '../types';

export async function submitNewsletterSubscription(
  payload: InsertNewsletterSubscription
): Promise<DatabaseResponse<NewsletterSubscriptionRow>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase credentials are not configured. Newsletter subscriptions cannot be persisted to PostgreSQL.',
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
    const cleanEmail = payload.email.trim().toLowerCase();

    // Upsert on email conflict so repeated subscriptions don't crash
    const { data, error } = await client
      .from('newsletter_subscriptions')
      .upsert(
        {
          email: cleanEmail,
          source_page: payload.source_page || 'website',
          is_active: payload.is_active ?? true,
          metadata: payload.metadata || {},
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Newsletter subscription failed:', error.message);
      return {
        success: false,
        data: null,
        error: error.message,
        isConfigured: true,
      };
    }

    return {
      success: true,
      data: data as NewsletterSubscriptionRow,
      error: null,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('[Supabase] Unexpected error during newsletter subscription:', errorMessage);
    return {
      success: false,
      data: null,
      error: errorMessage,
      isConfigured: true,
    };
  }
}

