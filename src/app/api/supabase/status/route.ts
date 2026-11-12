import { NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase/connection-test';

export async function GET() {
  try {
    const result = await testSupabaseConnection();

    const httpStatus = result.status === 'connected' ? 200 : result.status === 'unconfigured' ? 200 : 503;

    return NextResponse.json(result, { status: httpStatus });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal diagnostic test error';
    return NextResponse.json(
      {
        configured: false,
        connected: false,
        status: 'error',
        message: `Connection test encountered unexpected failure: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
