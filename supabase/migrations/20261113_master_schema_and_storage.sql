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

-- =============================================================================
-- PART 4: ADMIN PORTAL, BATCHES, FORM FIELDS & CMS TABLES
-- =============================================================================

-- =============================================================================
-- Migration: 20261113000003_create_admin_and_management_tables.sql
-- Description: Admin portal authentication, activity logs, candidate status history,
--              course/internship batches, form fields configuration, page CMS, and blog.
-- Project: HydroSync Innovations LLP
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Admin Users & Membership
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    role TEXT NOT NULL DEFAULT 'manager' CHECK (role IN ('owner', 'super_admin', 'manager', 'course_manager', 'internship_manager', 'content_editor')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    last_sign_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON public.admin_users(is_active);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admins to view their own profile and super admins to view all
CREATE POLICY "admin_users_self_or_super_admin"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.role IN ('owner', 'super_admin') AND au.is_active = true
        )
    );

-- Allow super admins / owners to insert and update admin memberships
CREATE POLICY "admin_users_super_admin_manage"
    ON public.admin_users
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.role IN ('owner', 'super_admin') AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.role IN ('owner', 'super_admin') AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 2. Admin Activity Logs (Audit Trail)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.admin_activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_admin ON public.admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON public.admin_activity_logs(entity_type, entity_id);

ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_activity_logs_admin_read"
    ON public.admin_activity_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

CREATE POLICY "admin_activity_logs_admin_insert"
    ON public.admin_activity_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 3. Application Status History (Pipeline Tracking)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL,
    application_type TEXT NOT NULL CHECK (application_type IN ('internship', 'career', 'course', 'contact', 'event', 'institutional')),
    old_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    changed_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    changed_by_email TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_app_history_app_id ON public.application_status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_app_history_created ON public.application_status_history(created_at DESC);

ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_history_admin_all"
    ON public.application_status_history
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 4. Course Batches
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    batch_name TEXT NOT NULL,
    batch_code TEXT NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE,
    schedule TEXT,
    learning_mode TEXT NOT NULL CHECK (learning_mode IN ('Online Live', 'Hands-on Classroom', 'Hybrid')),
    capacity INT NOT NULL DEFAULT 30 CHECK (capacity > 0),
    seats_booked INT NOT NULL DEFAULT 0 CHECK (seats_booked >= 0),
    enrollment_open_date DATE,
    enrollment_close_date DATE,
    is_open BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_course_batches_course ON public.course_batches(course_id);
CREATE INDEX IF NOT EXISTS idx_course_batches_open ON public.course_batches(is_open);

ALTER TABLE public.course_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "course_batches_public_read"
    ON public.course_batches
    FOR SELECT
    TO anon, authenticated
    USING (is_open = true);

CREATE POLICY "course_batches_admin_all"
    ON public.course_batches
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 5. Internship Batches
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES public.internship_programs(id) ON DELETE CASCADE,
    batch_name TEXT NOT NULL,
    batch_code TEXT NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE,
    duration_weeks INT DEFAULT 4,
    mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline', 'Hybrid')),
    capacity INT NOT NULL DEFAULT 50 CHECK (capacity > 0),
    seats_enrolled INT NOT NULL DEFAULT 0 CHECK (seats_enrolled >= 0),
    application_deadline DATE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_internship_batches_prog ON public.internship_batches(program_id);
CREATE INDEX IF NOT EXISTS idx_internship_batches_active ON public.internship_batches(is_active);

ALTER TABLE public.internship_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "internship_batches_public_read"
    ON public.internship_batches
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "internship_batches_admin_all"
    ON public.internship_batches
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 6. Internship Application Form Fields Configuration
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_form_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_key TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    field_type TEXT NOT NULL CHECK (field_type IN ('text', 'email', 'tel', 'select', 'radio', 'textarea', 'file', 'checkbox')),
    placeholder TEXT,
    help_text TEXT,
    is_required BOOLEAN NOT NULL DEFAULT true,
    options JSONB DEFAULT '[]'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_form_fields_order ON public.internship_form_fields(display_order);

ALTER TABLE public.internship_form_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "internship_form_fields_public_read"
    ON public.internship_form_fields
    FOR SELECT
    TO anon, authenticated
    USING (is_enabled = true);

CREATE POLICY "internship_form_fields_admin_all"
    ON public.internship_form_fields
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- Seed baseline required form fields if empty
INSERT INTO public.internship_form_fields (field_key, label, field_type, placeholder, is_required, display_order, is_enabled)
VALUES
    ('fullName', 'Full Name', 'text', 'Enter your full legal name', true, 1, true),
    ('email', 'Email Address', 'email', 'name@example.com', true, 2, true),
    ('phone', 'Phone Number', 'tel', '10-digit mobile number', true, 3, true),
    ('college', 'College / University', 'text', 'Your college name', true, 4, true),
    ('branch', 'Engineering Branch', 'text', 'e.g. ECE, CSE, IT, EEE, Mechanical', true, 5, true),
    ('yearOfStudy', 'Year of Study', 'select', 'Select your year', true, 6, true),
    ('preferredProgram', 'Internship Program Track', 'select', 'Choose program', true, 7, true),
    ('preferredMode', 'Preferred Mode', 'select', 'Online, Offline Lab, or Hybrid', true, 8, true),
    ('resumeFile', 'Resume / Portfolio', 'file', 'PDF, DOC, DOCX or ZIP (max 10MB)', false, 9, true),
    ('additionalMessage', 'Cover Note / Projects', 'textarea', 'Tell us about your interests or past projects', false, 10, true),
    ('consent', 'Declaration & Consent', 'checkbox', 'I confirm all information is accurate', true, 11, true)
ON CONFLICT (field_key) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 7. Page Contents (Structured Section CMS for all 22 pages)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    section_key TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    content TEXT,
    media_url TEXT,
    cta_text TEXT,
    cta_url TEXT,
    secondary_cta_text TEXT,
    secondary_cta_url TEXT,
    extra_data JSONB DEFAULT '{}'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(page_slug, section_key)
);

CREATE INDEX IF NOT EXISTS idx_page_contents_lookup ON public.page_contents(page_slug, section_key);
CREATE INDEX IF NOT EXISTS idx_page_contents_published ON public.page_contents(is_published);

ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_contents_public_read"
    ON public.page_contents
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true AND status = 'published');

CREATE POLICY "page_contents_admin_all"
    ON public.page_contents
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 8. Content Revisions (Version History)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    section_key TEXT NOT NULL,
    version_number INT NOT NULL DEFAULT 1,
    snapshot JSONB NOT NULL,
    created_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_content_rev_lookup ON public.content_revisions(page_slug, section_key, version_number DESC);

ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_revisions_admin_all"
    ON public.content_revisions
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );

-- -----------------------------------------------------------------------------
-- 9. Blog Posts & Resources
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    author_name TEXT NOT NULL DEFAULT 'HydroSync Engineering Team',
    category TEXT NOT NULL DEFAULT 'IoT & Embedded',
    tags TEXT[] DEFAULT '{}',
    read_time_minutes INT NOT NULL DEFAULT 5,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts_public_read"
    ON public.blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "blog_posts_admin_all"
    ON public.blog_posts
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        )
    );


-- ============================================================================
-- 10. GALLERY ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Laboratory',
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON public.gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_published ON public.gallery_items(is_published, display_order);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read published gallery items"
    ON public.gallery_items FOR SELECT
    USING (is_published = TRUE);

CREATE POLICY "Allow service role full access to gallery items"
    ON public.gallery_items FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

DROP TRIGGER IF EXISTS trg_gallery_items_updated_at ON public.gallery_items;
CREATE TRIGGER trg_gallery_items_updated_at
    BEFORE UPDATE ON public.gallery_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
