/**
 * HydroSync Innovations LLP — Dynamic Catalog Database Service
 *
 * Provides type-safe queries for courses, internship programs, services,
 * events, projects, team members, faqs, testimonials, and partners.
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';
import type {
  DatabaseResponse,
  CourseRow,
  InternshipProgramRow,
  ServiceRow,
  EventRow,
  ProjectRow,
  TeamMemberRow,
  FaqRow,
  TestimonialRow,
  PartnerRow,
} from '../types';

export async function getPublishedCourses(): Promise<DatabaseResponse<CourseRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as CourseRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching courses';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getActiveInternshipPrograms(): Promise<DatabaseResponse<InternshipProgramRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('internship_programs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as InternshipProgramRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching internships';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getActiveServices(): Promise<DatabaseResponse<ServiceRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as ServiceRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching services';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getUpcomingEvents(): Promise<DatabaseResponse<EventRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('events')
      .select('*')
      .eq('is_open', true)
      .order('start_date', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as EventRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching events';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getPublishedProjects(): Promise<DatabaseResponse<ProjectRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as ProjectRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching projects';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getActiveTeamMembers(): Promise<DatabaseResponse<TeamMemberRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as TeamMemberRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching team';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getPublishedFaqs(category?: FaqRow['category']): Promise<DatabaseResponse<FaqRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    let query = client
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as FaqRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching FAQs';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getFeaturedTestimonials(): Promise<DatabaseResponse<TestimonialRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('testimonials')
      .select('*')
      .eq('is_featured', true);

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as TestimonialRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching testimonials';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

export async function getActivePartners(): Promise<DatabaseResponse<PartnerRow[]>> {
  if (!isSupabaseConfigured()) {
    return { success: false, data: null, error: 'Supabase unconfigured', isConfigured: false };
  }
  const client = getActiveServerClient();
  if (!client) return { success: false, data: null, error: 'No client', isConfigured: false };

  try {
    const { data, error } = await client
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) return { success: false, data: null, error: error.message, isConfigured: true };
    return { success: true, data: data as PartnerRow[], error: null, isConfigured: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching partners';
    return { success: false, data: null, error: msg, isConfigured: true };
  }
}

