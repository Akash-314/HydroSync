/**
 * HydroSync Innovations LLP — Supabase Database Types & Schemas
 *
 * Defines TypeScript types for all supported database tables,
 * insert payloads, and service response wrappers.
 *
 * Note: Uses type aliases (not interfaces) to satisfy PostgREST GenericTable constraints.
 */

export interface DatabaseResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  isConfigured: boolean;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// -----------------------------------------------------------------------------
// 1. Contact Enquiries
// -----------------------------------------------------------------------------
export type ContactEnquiryRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  category: 'Internship' | 'Course' | 'School' | 'College' | 'Enterprise' | 'Other';
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'resolved' | 'archived';
  metadata: Json | null;
};

export type InsertContactEnquiry = {
  full_name: string;
  email: string;
  phone: string;
  category: 'Internship' | 'Course' | 'School' | 'College' | 'Enterprise' | 'Other';
  message: string;
  status?: 'new' | 'in_review' | 'contacted' | 'resolved' | 'archived';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 2. Internship Applications
// -----------------------------------------------------------------------------
export type InternshipApplicationRow = {
  id: string;
  application_id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year_of_study: string;
  area_of_interest: string;
  preferred_program: string;
  preferred_mode: 'Online' | 'Offline' | 'Hybrid';
  resume_url: string | null;
  additional_message: string | null;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'accepted';
  metadata: Json | null;
};

export type InsertInternshipApplication = {
  application_id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year_of_study: string;
  area_of_interest: string;
  preferred_program: string;
  preferred_mode: 'Online' | 'Offline' | 'Hybrid';
  resume_url?: string | null;
  additional_message?: string | null;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'accepted';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 3. Course Enquiries
// -----------------------------------------------------------------------------
export type CourseEnquiryRow = {
  id: string;
  enquiry_id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  course_of_interest: string;
  learning_mode: 'Online Live' | 'Hands-on Classroom' | 'Hybrid';
  message: string | null;
  status: 'new' | 'contacted' | 'enrolled' | 'cancelled';
  metadata: Json | null;
};

export type InsertCourseEnquiry = {
  enquiry_id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  course_of_interest: string;
  learning_mode: 'Online Live' | 'Hands-on Classroom' | 'Hybrid';
  message?: string | null;
  status?: 'new' | 'contacted' | 'enrolled' | 'cancelled';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 4. Event Registrations
// -----------------------------------------------------------------------------
export type EventRegistrationRow = {
  id: string;
  registration_id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  event_or_class: string;
  session_type: 'Event' | 'Masterclass' | 'Workshop' | 'Webinar';
  number_of_attendees: number;
  message: string | null;
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  metadata: Json | null;
};

export type InsertEventRegistration = {
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  event_or_class: string;
  session_type?: 'Event' | 'Masterclass' | 'Workshop' | 'Webinar';
  number_of_attendees?: number;
  message?: string | null;
  status?: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 5. School and College (Institutional) Enquiries
// -----------------------------------------------------------------------------
export type InstitutionalEnquiryRow = {
  id: string;
  enquiry_id: string;
  created_at: string;
  institution_type: 'school' | 'college' | 'university' | 'polytechnic' | 'corporate';
  institution_name: string;
  contact_person: string;
  designation: string | null;
  email: string;
  phone: string;
  city: string | null;
  state: string | null;
  program_interest: string;
  estimated_students: number | null;
  message: string | null;
  status: 'new' | 'in_discussion' | 'mou_drafted' | 'active' | 'archived';
  metadata: Json | null;
};

export type InsertInstitutionalEnquiry = {
  enquiry_id: string;
  institution_type: 'school' | 'college' | 'university' | 'polytechnic' | 'corporate';
  institution_name: string;
  contact_person: string;
  designation?: string | null;
  email: string;
  phone: string;
  city?: string | null;
  state?: string | null;
  program_interest: string;
  estimated_students?: number | null;
  message?: string | null;
  status?: 'new' | 'in_discussion' | 'mou_drafted' | 'active' | 'archived';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 6. Career Applications
// -----------------------------------------------------------------------------
export type CareerApplicationRow = {
  id: string;
  application_id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  position_applied: string;
  experience_years: string | null;
  portfolio_or_linkedin: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  status: 'received' | 'under_review' | 'shortlisted' | 'rejected' | 'offered';
  metadata: Json | null;
};

export type InsertCareerApplication = {
  application_id: string;
  full_name: string;
  email: string;
  phone: string;
  position_applied: string;
  experience_years?: string | null;
  portfolio_or_linkedin?: string | null;
  resume_url?: string | null;
  cover_letter?: string | null;
  status?: 'received' | 'under_review' | 'shortlisted' | 'rejected' | 'offered';
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// 7. Newsletter Subscriptions
// -----------------------------------------------------------------------------
export type NewsletterSubscriptionRow = {
  id: string;
  created_at: string;
  email: string;
  source_page: string | null;
  is_active: boolean;
  metadata: Json | null;
};

export type InsertNewsletterSubscription = {
  email: string;
  source_page?: string | null;
  is_active?: boolean;
  metadata?: Json | null;
};

// -----------------------------------------------------------------------------
// Database Schema Map
// -----------------------------------------------------------------------------
export type Database = {
  public: {
    Tables: {
      contact_enquiries: {
        Row: ContactEnquiryRow;
        Insert: InsertContactEnquiry;
        Update: Partial<InsertContactEnquiry>;
        Relationships: [];
      };
      internship_applications: {
        Row: InternshipApplicationRow;
        Insert: InsertInternshipApplication;
        Update: Partial<InsertInternshipApplication>;
        Relationships: [];
      };
      course_enquiries: {
        Row: CourseEnquiryRow;
        Insert: InsertCourseEnquiry;
        Update: Partial<InsertCourseEnquiry>;
        Relationships: [];
      };
      event_registrations: {
        Row: EventRegistrationRow;
        Insert: InsertEventRegistration;
        Update: Partial<InsertEventRegistration>;
        Relationships: [];
      };
      institutional_enquiries: {
        Row: InstitutionalEnquiryRow;
        Insert: InsertInstitutionalEnquiry;
        Update: Partial<InsertInstitutionalEnquiry>;
        Relationships: [];
      };
      career_applications: {
        Row: CareerApplicationRow;
        Insert: InsertCareerApplication;
        Update: Partial<InsertCareerApplication>;
        Relationships: [];
      };
      newsletter_subscriptions: {
        Row: NewsletterSubscriptionRow;
        Insert: InsertNewsletterSubscription;
        Update: Partial<InsertNewsletterSubscription>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
