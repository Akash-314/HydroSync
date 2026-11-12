/**
 * HydroSync Innovations LLP — Centralized Supabase Integration Module
 *
 * This module exports:
 * 1. Safe Browser & Server Supabase clients
 * 2. Configuration verification utilities
 * 3. Reusable typed database service operations
 * 4. TypeScript database types
 */

export * from './types';
export * from './client';
export * from './server';
export * from './services';
export * from './connection-test';

import * as services from './services';
import { isSupabaseConfigured, getSupabaseConfigStatus } from './client';

/**
 * Reusable Database Service facade for HydroSync operations
 */
export const db = {
  isConfigured: isSupabaseConfigured,
  status: getSupabaseConfigStatus,
  contact: services.submitContactEnquiry,
  internships: services.submitInternshipApplication,
  courses: services.submitCourseEnquiry,
  events: services.submitEventRegistration,
  institutional: services.submitInstitutionalEnquiry,
  careers: services.submitCareerApplication,
  newsletter: services.submitNewsletterSubscription,
};

