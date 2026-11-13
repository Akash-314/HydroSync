-- =============================================================================
-- HydroSync Innovations LLP — Master Database & Storage Migration
-- Version: 2026-11-13
-- Author: Principal Database Architect
-- Instructions: Copy and paste this complete SQL file into Supabase Dashboard ->
--               SQL Editor -> New Query, and click "Run".
-- =============================================================================

-- Enable essential extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- PART 1: FORM SUBMISSION TABLES & RLS
-- =============================================================================

-- 1. Contact Enquiries
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    category TEXT NOT NULL CHECK (category IN ('Internship', 'Course', 'School', 'College', 'Enterprise', 'Other')),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 5),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'resolved', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_email ON public.contact_enquiries (email);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_enquiries_public_insert" ON public.contact_enquiries;
CREATE POLICY "contact_enquiries_public_insert"
    ON public.contact_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(message)) >= 5 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "contact_enquiries_admin_select" ON public.contact_enquiries;
CREATE POLICY "contact_enquiries_admin_select"
    ON public.contact_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- 2. Internship Applications
CREATE TABLE IF NOT EXISTS public.internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    college TEXT NOT NULL CHECK (char_length(trim(college)) >= 2),
    branch TEXT NOT NULL CHECK (char_length(trim(branch)) >= 2),
    year_of_study TEXT NOT NULL,
    area_of_interest TEXT,
    preferred_program TEXT NOT NULL,
    preferred_mode TEXT NOT NULL CHECK (preferred_mode IN ('Online', 'Offline', 'Hybrid')),
    resume_url TEXT,
    additional_message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'accepted')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_internship_apps_created_at ON public.internship_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internship_apps_status ON public.internship_applications (status);
CREATE INDEX IF NOT EXISTS idx_internship_apps_email ON public.internship_applications (email);
CREATE INDEX IF NOT EXISTS idx_internship_apps_app_id ON public.internship_applications (application_id);

ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "internship_apps_public_insert" ON public.internship_applications;
CREATE POLICY "internship_apps_public_insert"
    ON public.internship_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(college)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "internship_apps_admin_select" ON public.internship_applications;
CREATE POLICY "internship_apps_admin_select"
    ON public.internship_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- 3. Course Enquiries
CREATE TABLE IF NOT EXISTS public.course_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    college TEXT NOT NULL,
    course_of_interest TEXT NOT NULL,
    learning_mode TEXT NOT NULL CHECK (learning_mode IN ('Online Live', 'Hands-on Classroom', 'Hybrid')),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'cancelled')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_course_enquiries_created ON public.course_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_course_enquiries_status ON public.course_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_course_enquiries_course ON public.course_enquiries (course_of_interest);

ALTER TABLE public.course_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "course_enquiries_public_insert" ON public.course_enquiries;
CREATE POLICY "course_enquiries_public_insert"
    ON public.course_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "course_enquiries_admin_select" ON public.course_enquiries;
CREATE POLICY "course_enquiries_admin_select"
    ON public.course_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- 4. Event Registrations
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    college TEXT NOT NULL,
    event_or_class TEXT NOT NULL,
    session_type TEXT NOT NULL DEFAULT 'Event' CHECK (session_type IN ('Event', 'Masterclass', 'Workshop', 'Webinar')),
    number_of_attendees INT NOT NULL DEFAULT 1 CHECK (number_of_attendees > 0 AND number_of_attendees <= 20),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_created ON public.event_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON public.event_registrations (status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON public.event_registrations (event_or_class);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "event_registrations_public_insert" ON public.event_registrations;
CREATE POLICY "event_registrations_public_insert"
    ON public.event_registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
        number_of_attendees >= 1
    );

DROP POLICY IF EXISTS "event_registrations_admin_select" ON public.event_registrations;
CREATE POLICY "event_registrations_admin_select"
    ON public.event_registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- 5. School and College (Institutional) Enquiries
CREATE TABLE IF NOT EXISTS public.institutional_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    institution_type TEXT NOT NULL CHECK (institution_type IN ('school', 'college', 'university', 'polytechnic', 'corporate')),
    institution_name TEXT NOT NULL CHECK (char_length(trim(institution_name)) >= 3),
    contact_person TEXT NOT NULL CHECK (char_length(trim(contact_person)) >= 2),
    designation TEXT,
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    city TEXT,
    state TEXT,
    program_interest TEXT NOT NULL,
    estimated_students INT CHECK (estimated_students IS NULL OR estimated_students >= 1),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_discussion', 'mou_drafted', 'active', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_institutional_enquiries_created ON public.institutional_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_institutional_enquiries_type ON public.institutional_enquiries (institution_type);
CREATE INDEX IF NOT EXISTS idx_institutional_enquiries_status ON public.institutional_enquiries (status);

ALTER TABLE public.institutional_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "institutional_enquiries_public_insert" ON public.institutional_enquiries;
CREATE POLICY "institutional_enquiries_public_insert"
    ON public.institutional_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(institution_name)) >= 3 AND
        char_length(trim(contact_person)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "institutional_enquiries_admin_select" ON public.institutional_enquiries;
CREATE POLICY "institutional_enquiries_admin_select"
    ON public.institutional_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- 6. Career Applications
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
    position_applied TEXT NOT NULL,
    experience_years TEXT,
    portfolio_or_linkedin TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'shortlisted', 'rejected', 'offered')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_career_apps_created ON public.career_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_apps_status ON public.career_applications (status);
CREATE INDEX IF NOT EXISTS idx_career_apps_position ON public.career_applications (position_applied);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "career_apps_public_insert" ON public.career_applications;
CREATE POLICY "career_apps_public_insert"
    ON public.career_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "career_apps_admin_select" ON public.career_applications;
CREATE POLICY "career_apps_admin_select"
    ON public.career_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- 7. Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    source_page TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_newsletter_created ON public.newsletter_subscriptions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_is_active ON public.newsletter_subscriptions (is_active);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_public_insert" ON public.newsletter_subscriptions;
CREATE POLICY "newsletter_public_insert"
    ON public.newsletter_subscriptions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

DROP POLICY IF EXISTS "newsletter_admin_select" ON public.newsletter_subscriptions;
CREATE POLICY "newsletter_admin_select"
    ON public.newsletter_subscriptions
    FOR SELECT
    TO authenticated
    USING (true);

-- =============================================================================
-- PART 2: DYNAMIC PUBLIC CATALOG TABLES & RLS
-- =============================================================================

-- 8. Courses
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Embedded Systems', 'IoT', 'Edge AI', 'Robotics', 'VLSI', 'PCB Design')),
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
    duration_weeks INT NOT NULL CHECK (duration_weeks > 0),
    learning_mode TEXT NOT NULL CHECK (learning_mode IN ('Online Live', 'Hands-on Classroom', 'Hybrid')),
    price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    short_description TEXT NOT NULL,
    overview TEXT,
    syllabus JSONB DEFAULT '[]'::jsonb,
    prerequisites TEXT[] DEFAULT '{}',
    hardware_tools TEXT[] DEFAULT '{}',
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses (slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses (is_published);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "courses_public_read" ON public.courses;
CREATE POLICY "courses_public_read"
    ON public.courses
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

DROP POLICY IF EXISTS "courses_admin_all" ON public.courses;
CREATE POLICY "courses_admin_all"
    ON public.courses
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 9. Internship Programs
CREATE TABLE IF NOT EXISTS public.internship_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    domain TEXT NOT NULL,
    duration TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline', 'Hybrid')),
    short_description TEXT NOT NULL,
    eligibility TEXT,
    learning_outcomes TEXT[] DEFAULT '{}',
    hardware_exposure TEXT[] DEFAULT '{}',
    seats_available INT DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_internship_programs_slug ON public.internship_programs (slug);
CREATE INDEX IF NOT EXISTS idx_internship_programs_active ON public.internship_programs (is_active);
ALTER TABLE public.internship_programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "internship_programs_public_read" ON public.internship_programs;
CREATE POLICY "internship_programs_public_read"
    ON public.internship_programs
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

DROP POLICY IF EXISTS "internship_programs_admin_all" ON public.internship_programs;
CREATE POLICY "internship_programs_admin_all"
    ON public.internship_programs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 10. Services
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Hardware Prototyping', 'IoT Architecture', 'Firmware Development', 'Institutional Labs', 'Corporate R&D')),
    summary TEXT NOT NULL,
    detailed_scope TEXT,
    deliverables TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services (slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services (is_active);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "services_public_read" ON public.services;
CREATE POLICY "services_public_read"
    ON public.services
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

DROP POLICY IF EXISTS "services_admin_all" ON public.services;
CREATE POLICY "services_admin_all"
    ON public.services
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 11. Events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('Event', 'Masterclass', 'Workshop', 'Webinar', 'Bootcamp')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    venue TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'In-Person', 'Hybrid')),
    speaker_name TEXT,
    speaker_title TEXT,
    description TEXT NOT NULL,
    max_seats INT NOT NULL DEFAULT 50,
    registered_count INT NOT NULL DEFAULT 0,
    is_open BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events (slug);
CREATE INDEX IF NOT EXISTS idx_events_start ON public.events (start_date);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_public_read" ON public.events;
CREATE POLICY "events_public_read"
    ON public.events
    FOR SELECT
    TO anon, authenticated
    USING (is_open = true);

DROP POLICY IF EXISTS "events_admin_all" ON public.events;
CREATE POLICY "events_admin_all"
    ON public.events
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 12. Projects Showcase
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Industrial IoT', 'Smart Agriculture', 'Water Telemetry', 'Edge AI', 'Robotics', 'Embedded Firmware')),
    client_type TEXT DEFAULT 'Enterprise / R&D',
    problem_statement TEXT NOT NULL,
    technical_solution TEXT NOT NULL,
    stack TEXT[] DEFAULT '{}',
    metrics JSONB DEFAULT '{}'::jsonb,
    image_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_public_read" ON public.projects;
CREATE POLICY "projects_public_read"
    ON public.projects
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

DROP POLICY IF EXISTS "projects_admin_all" ON public.projects;
CREATE POLICY "projects_admin_all"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 13. Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    linkedin_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team_members_public_read" ON public.team_members;
CREATE POLICY "team_members_public_read"
    ON public.team_members
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 14. FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Internships', 'Courses', 'Institutional', 'General', 'Technical')),
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "faqs_public_read" ON public.faqs;
CREATE POLICY "faqs_public_read"
    ON public.faqs
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- 15. Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    author_name TEXT NOT NULL,
    author_title TEXT NOT NULL,
    organization TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_public_read" ON public.testimonials;
CREATE POLICY "testimonials_public_read"
    ON public.testimonials
    FOR SELECT
    TO anon, authenticated
    USING (is_featured = true);

-- 16. Partners
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL,
    partner_type TEXT NOT NULL CHECK (partner_type IN ('University / College', 'School', 'Industry / Corporate', 'Government / Incubation')),
    logo_url TEXT,
    website TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "partners_public_read" ON public.partners;
CREATE POLICY "partners_public_read"
    ON public.partners
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 17. Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings_public_read" ON public.site_settings;
CREATE POLICY "site_settings_public_read"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- =============================================================================
-- PART 3: SUPABASE STORAGE BUCKETS & STORAGE RLS
-- =============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    (
        'application-attachments',
        'application-attachments',
        false,
        10485760, -- 10 MB limit
        ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-zip-compressed']
    ),
    (
        'public-assets',
        'public-assets',
        true,
        20971520, -- 20 MB limit
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
    ),
    (
        'project-media',
        'project-media',
        true,
        26214400, -- 25 MB limit
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
    ),
    (
        'gallery',
        'gallery',
        true,
        26214400, -- 25 MB limit
        ARRAY['image/png', 'image/jpeg', 'image/webp']
    )
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS
DROP POLICY IF EXISTS "public_read_public_buckets" ON storage.objects;
CREATE POLICY "public_read_public_buckets"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id IN ('public-assets', 'project-media', 'gallery'));

DROP POLICY IF EXISTS "allow_applicant_upload_attachments" ON storage.objects;
CREATE POLICY "allow_applicant_upload_attachments"
    ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        bucket_id = 'application-attachments' AND
        (storage.extension(name) IN ('pdf', 'doc', 'docx', 'zip'))
    );

DROP POLICY IF EXISTS "allow_admin_read_attachments" ON storage.objects;
CREATE POLICY "allow_admin_read_attachments"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'application-attachments');

DROP POLICY IF EXISTS "allow_admin_manage_all_storage" ON storage.objects;
CREATE POLICY "allow_admin_manage_all_storage"
    ON storage.objects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
