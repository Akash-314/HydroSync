/**
 * HydroSync Innovations LLP — Centralized Supabase Integration Module
 *
 * This module exports:
 * 1. Safe Browser & Server Supabase clients
 * 2. Configuration verification utilities
 * 3. Reusable typed database service operations (Submissions + Dynamic Catalogs)
 * 4. Storage operations & diagnostics
 * 5. TypeScript database types
 */

export * from './types';
export * from './client';
export * from './server';
export * from './services';
export * from './connection-test';
export * from './storage';

import * as services from './services';
import * as storage from './storage';
import { isSupabaseConfigured, getSupabaseConfigStatus } from './client';

/**
 * Reusable Database Service facade for HydroSync operations
 */
export const db = {
  isConfigured: isSupabaseConfigured,
  status: getSupabaseConfigStatus,

  // Submission services
  contact: services.submitContactEnquiry,
  internships: services.submitInternshipApplication,
  courses: services.submitCourseEnquiry,
  events: services.submitEventRegistration,
  institutional: services.submitInstitutionalEnquiry,
  careers: services.submitCareerApplication,
  newsletter: services.submitNewsletterSubscription,

  // Catalog queries
  getCourses: services.getPublishedCourses,
  getInternshipPrograms: services.getActiveInternshipPrograms,
  getServices: services.getActiveServices,
  getEvents: services.getUpcomingEvents,
  getProjects: services.getPublishedProjects,
  getTeam: services.getActiveTeamMembers,
  getFaqs: services.getPublishedFaqs,
  getTestimonials: services.getFeaturedTestimonials,
  getPartners: services.getActivePartners,

  // Storage operations
  storage: {
    uploadAttachment: storage.uploadApplicantAttachment,
    getSignedUrl: storage.getAttachmentSignedUrl,
    getPublicUrl: storage.getPublicMediaUrl,
  },
};
