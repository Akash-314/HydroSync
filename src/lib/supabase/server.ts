/**
 * HydroSync Innovations LLP — Supabase Server Client
 *
 * Centralized, safe Supabase client for Next.js Route Handlers and Server Components.
 * Never exposes service-role keys or sensitive credentials to browser bundles.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { isSupabaseConfigured } from './client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

let serverClient: SupabaseClient<Database> | null = null;
let adminClient: SupabaseClient<Database> | null = null;

/**
 * Returns a server-side Supabase client using the standard publishable/anon key.
 * This respects Row Level Security (RLS) policies configured in PostgreSQL.
 * Returns null if Supabase is unconfigured.
 */
export function getSupabaseServerClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured() || !supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!serverClient) {
    serverClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serverClient;
}

/**
 * Returns a privileged admin client if SUPABASE_SERVICE_ROLE_KEY is configured.
 * STRICTLY SERVER-SIDE ONLY. Never import or call from client components.
 */
export function getSupabaseAdminClient(): SupabaseClient<Database> | null {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  const isPlaceholder = serviceRoleKey.includes('your-service-role-key') || serviceRoleKey.length < 20;
  if (isPlaceholder) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}

/**
 * Returns the best available server client:
 * Prefers the Admin Client (if service role key is present) for trusted backend batch ingestion,
 * otherwise falls back to the standard RLS server client.
 */
export function getActiveServerClient(): SupabaseClient<Database> | null {
  return getSupabaseAdminClient() || getSupabaseServerClient();
}

