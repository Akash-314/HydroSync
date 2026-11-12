/**
 * HydroSync Innovations LLP — Supabase Browser Client
 *
 * Centralized, safe Supabase client for client-side React components.
 * Gracefully handles unconfigured states without crashing or blocking the UI.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)?.trim();

/**
 * Checks whether valid Supabase credentials have been configured.
 * Validates that the URL starts with https:// and the publishable/anon key is present and non-placeholder.
 */
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseKey) {
    return false;
  }
  const isPlaceholderUrl =
    supabaseUrl.includes('your-project-id') ||
    supabaseUrl.includes('example.supabase.co');
  const isPlaceholderKey =
    supabaseKey.includes('your-supabase-publishable-key') ||
    supabaseKey.includes('your-supabase-anon-key') ||
    supabaseKey.length < 20;

  return (
    supabaseUrl.startsWith('https://') &&
    !isPlaceholderUrl &&
    !isPlaceholderKey
  );
}

/**
 * Returns diagnostic metadata regarding current configuration state.
 */
export function getSupabaseConfigStatus() {
  const isUrlSet = Boolean(supabaseUrl && !supabaseUrl.includes('your-project-id'));
  const isKeySet = Boolean(
    supabaseKey &&
    !supabaseKey.includes('your-supabase-publishable-key') &&
    !supabaseKey.includes('your-supabase-anon-key')
  );
  const configured = isSupabaseConfigured();

  return {
    isConfigured: configured,
    hasUrl: isUrlSet,
    hasKey: isKeySet,
    urlMasked: supabaseUrl ? supabaseUrl.replace(/(https:\/\/[^.]+).*/, '$1.supabase.co') : null,
  };
}

let browserClient: SupabaseClient<Database> | null = null;

/**
 * Singleton factory for browser-side Supabase client.
 * Returns null if credentials are not configured.
 */
export function getSupabaseBrowserClient(): SupabaseClient<Database> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!browserClient && supabaseUrl && supabaseKey) {
    browserClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return browserClient;
}

// Export default singleton accessor
export const supabase = {
  get client() {
    return getSupabaseBrowserClient();
  },
  isConfigured: isSupabaseConfigured,
  status: getSupabaseConfigStatus,
};

