/**
 * HydroSync Innovations LLP — Admin Dashboard Data Service
 *
 * Computes live operational metrics and retrieves recent activities
 * across all database tables without mock data.
 */

import { getActiveServerClient } from '../server';
import { isSupabaseConfigured } from '../client';

export interface DashboardMetrics {
  totalCourses: number;
  totalInternships: number;
  totalApplications: number;
  pendingApplications: number;
  upcomingEvents: number;
  totalProjects: number;
  totalEnquiries: number;
  totalSubscribers: number;
  totalBlogPosts: number;
}

export interface RecentSubmission {
  id: string;
  type: 'internship' | 'contact' | 'event' | 'career';
  title: string;
  subtitle: string;
  timestamp: string;
  status: string;
  url: string;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const fallback: DashboardMetrics = {
    totalCourses: 0,
    totalInternships: 0,
    totalApplications: 0,
    pendingApplications: 0,
    upcomingEvents: 0,
    totalProjects: 0,
    totalEnquiries: 0,
    totalSubscribers: 0,
    totalBlogPosts: 0,
  };

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const client = getActiveServerClient();
  if (!client) return fallback;

  try {
    const getCount = async (query: any) => {
      try {
        const { count } = await query;
        return count || 0;
      } catch {
        return 0;
      }
    };

    const [
      coursesCount,
      internshipsCount,
      applicationsCount,
      pendingAppsCount,
      eventsCount,
      projectsCount,
      contactCount,
      subscribersCount,
      blogCount,
    ] = await Promise.all([
      getCount(client.from('courses').select('id', { count: 'exact', head: true })),
      getCount(client.from('internship_programs').select('id', { count: 'exact', head: true })),
      getCount(client.from('internship_applications').select('id', { count: 'exact', head: true })),
      getCount(client.from('internship_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending')),
      getCount(client.from('events').select('id', { count: 'exact', head: true })),
      getCount(client.from('projects').select('id', { count: 'exact', head: true })),
      getCount(client.from('contact_enquiries').select('id', { count: 'exact', head: true })),
      getCount(client.from('newsletter_subscriptions').select('id', { count: 'exact', head: true })),
      getCount(client.from('blog_posts').select('id', { count: 'exact', head: true })),
    ]);

    return {
      totalCourses: coursesCount,
      totalInternships: internshipsCount,
      totalApplications: applicationsCount,
      pendingApplications: pendingAppsCount,
      upcomingEvents: eventsCount,
      totalProjects: projectsCount,
      totalEnquiries: contactCount,
      totalSubscribers: subscribersCount,
      totalBlogPosts: blogCount,
    };
  } catch (err) {
    console.warn('[Dashboard Metrics] Error calculating metrics:', err);
    return fallback;
  }
}

export async function getRecentSubmissions(): Promise<RecentSubmission[]> {
  if (!isSupabaseConfigured()) return [];
  const client = getActiveServerClient();
  if (!client) return [];

  const results: RecentSubmission[] = [];

  try {
    // 1. Fetch recent internship applications
    const { data: apps } = await client
      .from('internship_applications')
      .select('id, application_id, full_name, preferred_program, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    if (apps) {
      apps.forEach((a) => {
        results.push({
          id: a.id,
          type: 'internship',
          title: a.full_name,
          subtitle: `Internship: ${a.preferred_program}`,
          timestamp: a.created_at,
          status: a.status,
          url: `/admin/internships/applications?id=${a.application_id}`,
        });
      });
    }

    // 2. Fetch recent contact enquiries
    const { data: contacts } = await client
      .from('contact_enquiries')
      .select('id, full_name, category, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    if (contacts) {
      contacts.forEach((c) => {
        results.push({
          id: c.id,
          type: 'contact',
          title: c.full_name,
          subtitle: `Enquiry: ${c.category}`,
          timestamp: c.created_at,
          status: c.status,
          url: `/admin/submissions?id=${c.id}`,
        });
      });
    }

    // Sort combined by timestamp descending
    results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return results.slice(0, 8);
  } catch (err) {
    console.warn('[Dashboard Submissions] Error fetching recent records:', err);
    return [];
  }
}

