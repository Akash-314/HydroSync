/**
 * HydroSync Innovations LLP — Supabase Database Types & Schemas
 *
 * Defines complete TypeScript types for all 17 database tables,
 * insert payloads, storage buckets, and service response wrappers.
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
// PART 1: FORM SUBMISSION TYPES
// -----------------------------------------------------------------------------

// 1. Contact Enquiries
export type ContactEnquiryRow = {
  id: string;
  created_at: string;
  updated_at: string;
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

// 2. Internship Applications
export type InternshipApplicationRow = {
  id: string;
  application_id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year_of_study: string;
  area_of_interest: string | null;
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
  area_of_interest?: string | null;
  preferred_program: string;
  preferred_mode: 'Online' | 'Offline' | 'Hybrid';
  resume_url?: string | null;
  additional_message?: string | null;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'accepted';
  metadata?: Json | null;
};

// 3. Course Enquiries
export type CourseEnquiryRow = {
  id: string;
  enquiry_id: string;
  created_at: string;
  updated_at: string;
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

// 4. Event Registrations
export type EventRegistrationRow = {
  id: string;
  registration_id: string;
  created_at: string;
  updated_at: string;
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

// 5. School & College (Institutional) Enquiries
export type InstitutionalEnquiryRow = {
  id: string;
  enquiry_id: string;
  created_at: string;
  updated_at: string;
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

// 6. Career Applications
export type CareerApplicationRow = {
  id: string;
  application_id: string;
  created_at: string;
  updated_at: string;
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

// 7. Newsletter Subscriptions
export type NewsletterSubscriptionRow = {
  id: string;
  created_at: string;
  updated_at: string;
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
// PART 2: DYNAMIC PUBLIC CATALOG TYPES
// -----------------------------------------------------------------------------

// 8. Courses
export type CourseRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  category: 'Embedded Systems' | 'IoT' | 'Edge AI' | 'Robotics' | 'VLSI' | 'PCB Design';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration_weeks: number;
  learning_mode: 'Online Live' | 'Hands-on Classroom' | 'Hybrid';
  price_inr: number;
  short_description: string;
  overview: string | null;
  syllabus: Json;
  prerequisites: string[];
  hardware_tools: string[];
  is_published: boolean;
  display_order: number;
  metadata: Json | null;
};

// 9. Internship Programs
export type InternshipProgramRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  domain: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  short_description: string;
  eligibility: string | null;
  learning_outcomes: string[];
  hardware_exposure: string[];
  seats_available: number;
  is_active: boolean;
  display_order: number;
  metadata: Json | null;
};

// 10. Services
export type ServiceRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  category: 'Hardware Prototyping' | 'IoT Architecture' | 'Firmware Development' | 'Institutional Labs' | 'Corporate R&D';
  summary: string;
  detailed_scope: string | null;
  deliverables: string[];
  technologies: string[];
  is_active: boolean;
  display_order: number;
  metadata: Json | null;
};

// 11. Events
export type EventRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  event_type: 'Event' | 'Masterclass' | 'Workshop' | 'Webinar' | 'Bootcamp';
  start_date: string;
  end_date: string | null;
  venue: string;
  mode: 'Online' | 'In-Person' | 'Hybrid';
  speaker_name: string | null;
  speaker_title: string | null;
  description: string;
  max_seats: number;
  registered_count: number;
  is_open: boolean;
  metadata: Json | null;
};

// 12. Projects Showcase
export type ProjectRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  category: 'Industrial IoT' | 'Smart Agriculture' | 'Water Telemetry' | 'Edge AI' | 'Robotics' | 'Embedded Firmware';
  client_type: string | null;
  problem_statement: string;
  technical_solution: string;
  stack: string[];
  metrics: Json;
  image_url: string | null;
  featured: boolean;
  is_published: boolean;
  display_order: number;
  metadata: Json | null;
};

// 13. Team Members
export type TeamMemberRow = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  role: string;
  department: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_active: boolean;
  metadata: Json | null;
};

// 14. FAQs
export type FaqRow = {
  id: string;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
  category: 'Internships' | 'Courses' | 'Institutional' | 'General' | 'Technical';
  display_order: number;
  is_published: boolean;
};

// 15. Testimonials
export type TestimonialRow = {
  id: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_title: string;
  organization: string;
  quote: string;
  rating: number;
  avatar_url: string | null;
  is_featured: boolean;
  metadata: Json | null;
};

// 16. Partners
export type PartnerRow = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  partner_type: 'University / College' | 'School' | 'Industry / Corporate' | 'Government / Incubation';
  logo_url: string | null;
  website: string | null;
  is_active: boolean;
  display_order: number;
};

// 17. Site Settings
export type SiteSettingRow = {
  key: string;
  value: Json;
  description: string | null;
  updated_at: string;
};

// -----------------------------------------------------------------------------
// Database Schema Map for SupabaseClient<Database>
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
      courses: {
        Row: CourseRow;
        Insert: Partial<CourseRow> & { title: string; slug: string; category: CourseRow['category'] };
        Update: Partial<CourseRow>;
        Relationships: [];
      };
      internship_programs: {
        Row: InternshipProgramRow;
        Insert: Partial<InternshipProgramRow> & { title: string; slug: string; domain: string };
        Update: Partial<InternshipProgramRow>;
        Relationships: [];
      };
      services: {
        Row: ServiceRow;
        Insert: Partial<ServiceRow> & { title: string; slug: string; category: ServiceRow['category'] };
        Update: Partial<ServiceRow>;
        Relationships: [];
      };
      events: {
        Row: EventRow;
        Insert: Partial<EventRow> & { title: string; slug: string; start_date: string };
        Update: Partial<EventRow>;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: Partial<ProjectRow> & { title: string; slug: string; category: ProjectRow['category'] };
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
      team_members: {
        Row: TeamMemberRow;
        Insert: Partial<TeamMemberRow> & { full_name: string; role: string; department: string };
        Update: Partial<TeamMemberRow>;
        Relationships: [];
      };
      faqs: {
        Row: FaqRow;
        Insert: Partial<FaqRow> & { question: string; answer: string; category: FaqRow['category'] };
        Update: Partial<FaqRow>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: Partial<TestimonialRow> & { author_name: string; organization: string; quote: string };
        Update: Partial<TestimonialRow>;
        Relationships: [];
      };
      partners: {
        Row: PartnerRow;
        Insert: Partial<PartnerRow> & { name: string; partner_type: PartnerRow['partner_type'] };
        Update: Partial<PartnerRow>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: SiteSettingRow;
        Update: Partial<SiteSettingRow>;
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
