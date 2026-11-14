/**
 * HydroSync Innovations LLP — Admin Authentication & Authorization Guard
 *
 * Verifies active session, checks admin_users membership, and enforces
 * server-side Role-Based Access Control (RBAC).
 */

import { createAdminServerClient } from './server-auth';
import { getSupabaseAdminClient } from './server';
import type { AdminRole, AdminUserRow } from './types';
import type { User } from '@supabase/supabase-js';

export interface AdminAuthResult {
  authenticated: boolean;
  user: User | null;
  adminUser: AdminUserRow | null;
  role: AdminRole | null;
  error: string | null;
}

export async function verifyAdminSession(
  requiredRoles?: AdminRole[]
): Promise<AdminAuthResult> {
  try {
    const supabase = await createAdminServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        authenticated: false,
        user: null,
        adminUser: null,
        role: null,
        error: authError?.message || 'Authentication required. Please sign in.',
      };
    }

    // Prefer privileged admin client if available to bypass RLS recursion on admin_users,
    // otherwise fallback to session client
    const privilegedClient = getSupabaseAdminClient() || supabase;
    const { data: adminRecord, error: adminError } = await privilegedClient
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    if (adminError || !adminRecord) {
      return {
        authenticated: false,
        user,
        adminUser: null,
        role: null,
        error: 'Access denied: your account is not an authorized, active administrator.',
      };
    }

    const adminUser = adminRecord as AdminUserRow;

    // Check specific role requirements if supplied
    if (requiredRoles && requiredRoles.length > 0) {
      const isSuper = adminUser.role === 'owner' || adminUser.role === 'super_admin';
      if (!isSuper && !requiredRoles.includes(adminUser.role)) {
        return {
          authenticated: false,
          user,
          adminUser,
          role: adminUser.role,
          error: `Permission denied: action requires one of [${requiredRoles.join(', ')}] role.`,
        };
      }
    }

    return {
      authenticated: true,
      user,
      adminUser,
      role: adminUser.role,
      error: null,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal session verification failure';
    return {
      authenticated: false,
      user: null,
      adminUser: null,
      role: null,
      error: msg,
    };
  }
}

/**
 * Log an administrative activity into admin_activity_logs
 */
export async function logAdminActivity(params: {
  adminId?: string | null;
  adminEmail?: string;
  action: string;
  entityType?: string;
  entityId?: string | null;
  resourceType?: string;
  resourceId?: string | null;
  details?: Record<string, any>;
}) {
  try {
    const client = getSupabaseAdminClient() || await createAdminServerClient();
    await client.from('admin_activity_logs').insert({
      admin_id: params.adminId || null,
      admin_email: params.adminEmail || 'admin@hydrosync.in',
      action: params.action,
      entity_type: params.entityType || params.resourceType || 'system',
      entity_id: params.entityId || params.resourceId || null,
      details: (params.details || {}) as any,
    });
  } catch (e) {
    console.warn('[Admin Activity Log] Could not record activity:', e);
  }
}

