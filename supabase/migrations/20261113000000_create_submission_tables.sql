-- =============================================================================
-- Migration: 20261113000000_create_submission_tables.sql
-- Description: Core form submission tables with Row Level Security (RLS),
--              foreign keys, constraints, and audit timestamps.
-- Project: HydroSync Innovations LLP
-- =============================================================================

-- Ensure pgcrypto / uuid extensions are enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Contact Enquiries
-- -----------------------------------------------------------------------------
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

CREATE POLICY "contact_enquiries_public_insert"
    ON public.contact_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(message)) >= 5 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "contact_enquiries_admin_select"
    ON public.contact_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 2. Internship Applications
-- -----------------------------------------------------------------------------
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

CREATE POLICY "internship_apps_public_insert"
    ON public.internship_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(college)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "internship_apps_admin_select"
    ON public.internship_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 3. Course Enquiries
-- -----------------------------------------------------------------------------
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

CREATE POLICY "course_enquiries_public_insert"
    ON public.course_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "course_enquiries_admin_select"
    ON public.course_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 4. Event Registrations
-- -----------------------------------------------------------------------------
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

CREATE POLICY "event_registrations_public_insert"
    ON public.event_registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
        number_of_attendees >= 1
    );

CREATE POLICY "event_registrations_admin_select"
    ON public.event_registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 5. School and College (Institutional) Enquiries
-- -----------------------------------------------------------------------------
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

CREATE POLICY "institutional_enquiries_public_insert"
    ON public.institutional_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(institution_name)) >= 3 AND
        char_length(trim(contact_person)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "institutional_enquiries_admin_select"
    ON public.institutional_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 6. Career Applications
-- -----------------------------------------------------------------------------
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

CREATE POLICY "career_apps_public_insert"
    ON public.career_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "career_apps_admin_select"
    ON public.career_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 7. Newsletter Subscriptions
-- -----------------------------------------------------------------------------
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

CREATE POLICY "newsletter_public_insert"
    ON public.newsletter_subscriptions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

CREATE POLICY "newsletter_admin_select"
    ON public.newsletter_subscriptions
    FOR SELECT
    TO authenticated
    USING (true);

