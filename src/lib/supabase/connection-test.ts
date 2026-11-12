/**
 * HydroSync Innovations LLP — Supabase Connection Diagnostics
 *
 * Real connection verification tester.
 * Does NOT report connected unless genuine credentials are provided and responsive.
 */

import { isSupabaseConfigured, getSupabaseConfigStatus } from './client';
import { getSupabaseServerClient } from './server';

export interface ConnectionTestResult {
  configured: boolean;
  connected: boolean;
  status: 'connected' | 'unconfigured' | 'error';
  message: string;
  details?: {
    hasUrl: boolean;
    hasKey: boolean;
    urlMasked?: string | null;
    latencyMs?: number;
    errorDetails?: string;
  };
  supportedTables: string[];
  timestamp: string;
}

export const SUPPORTED_TABLES = [
  'contact_enquiries',
  'internship_applications',
  'course_enquiries',
  'event_registrations',
  'institutional_enquiries',
  'career_applications',
  'newsletter_subscriptions',
];

/**
 * Executes a real connection test against the configured Supabase instance.
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const timestamp = new Date().toISOString();
  const config = getSupabaseConfigStatus();

  // 1. If credentials are not configured, return honest unconfigured state
  if (!config.isConfigured) {
    return {
      configured: false,
      connected: false,
      status: 'unconfigured',
      message:
        'Supabase credentials are not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your local environment (.env.local) to connect.',
      details: {
        hasUrl: config.hasUrl,
        hasKey: config.hasKey,
        urlMasked: config.urlMasked,
      },
      supportedTables: SUPPORTED_TABLES,
      timestamp,
    };
  }

  const client = getSupabaseServerClient();
  if (!client) {
    return {
      configured: true,
      connected: false,
      status: 'error',
      message: 'Failed to instantiate Supabase client with current credentials.',
      details: {
        hasUrl: config.hasUrl,
        hasKey: config.hasKey,
        urlMasked: config.urlMasked,
      },
      supportedTables: SUPPORTED_TABLES,
      timestamp,
    };
  }

  // 2. Perform live network test
  const startTime = Date.now();
  try {
    // Attempt a light query to verify database connectivity.
    // In an RLS-secured environment, anon select might return empty data or 42501 (insufficient privileges),
    // both of which confirm that the database endpoint is reachable and authenticating.
    const { data: _data, error } = await client
      .from('contact_enquiries')
      .select('id')
      .limit(1);

    const latencyMs = Date.now() - startTime;

    // PostgreSQL code 42P01 means table does not exist yet (migrations need to be run)
    if (error && error.code === '42P01') {
      return {
        configured: true,
        connected: false,
        status: 'error',
        message:
          'Connected to Supabase project, but the required tables have not been created yet. Please execute the SQL migration script provided in SUPABASE_SETUP.md in your Supabase SQL Editor.',
        details: {
          hasUrl: config.hasUrl,
          hasKey: config.hasKey,
          urlMasked: config.urlMasked,
          latencyMs,
          errorDetails: error.message,
        },
        supportedTables: SUPPORTED_TABLES,
        timestamp,
      };
    }

    // Invalid API key
    if (error && (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('apikey'))) {
      return {
        configured: true,
        connected: false,
        status: 'error',
        message: `Authentication failed: ${error.message}. Please verify your NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.`,
        details: {
          hasUrl: config.hasUrl,
          hasKey: config.hasKey,
          urlMasked: config.urlMasked,
          latencyMs,
          errorDetails: error.message,
        },
        supportedTables: SUPPORTED_TABLES,
        timestamp,
      };
    }

    // Other unexpected error
    if (error && error.code !== '42501') {
      return {
        configured: true,
        connected: false,
        status: 'error',
        message: `Database ping returned error: ${error.message} (Code: ${error.code || 'UNKNOWN'}).`,
        details: {
          hasUrl: config.hasUrl,
          hasKey: config.hasKey,
          urlMasked: config.urlMasked,
          latencyMs,
          errorDetails: error.message,
        },
        supportedTables: SUPPORTED_TABLES,
        timestamp,
      };
    }

    // Genuine successful connection
    return {
      configured: true,
      connected: true,
      status: 'connected',
      message: 'Successfully established live connection to HydroSync Supabase PostgreSQL instance.',
      details: {
        hasUrl: config.hasUrl,
        hasKey: config.hasKey,
        urlMasked: config.urlMasked,
        latencyMs,
      },
      supportedTables: SUPPORTED_TABLES,
      timestamp,
    };
  } catch (err: unknown) {
    const latencyMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : 'Network connection failed';

    return {
      configured: true,
      connected: false,
      status: 'error',
      message: `Failed to connect to Supabase endpoint: ${errorMessage}. Verify that the project URL is reachable and active.`,
      details: {
        hasUrl: config.hasUrl,
        hasKey: config.hasKey,
        urlMasked: config.urlMasked,
        latencyMs,
        errorDetails: errorMessage,
      },
      supportedTables: SUPPORTED_TABLES,
      timestamp,
    };
  }
}
