-- =============================================================================
-- Migration: 20261113000001_create_catalog_tables.sql
-- Description: Dynamic public catalog & content tables for HydroSync website
--              with Row Level Security (RLS) public read access.
-- Project: HydroSync Innovations LLP
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Courses Catalog
-- -----------------------------------------------------------------------------
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
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses (category);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses (is_published);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_public_read"
    ON public.courses
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "courses_admin_all"
    ON public.courses
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 2. Internship Programs Catalog
-- -----------------------------------------------------------------------------
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

CREATE POLICY "internship_programs_public_read"
    ON public.internship_programs
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "internship_programs_admin_all"
    ON public.internship_programs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 3. Services & Engineering Capabilities
-- -----------------------------------------------------------------------------
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

CREATE POLICY "services_public_read"
    ON public.services
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "services_admin_all"
    ON public.services
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 4. Events & Masterclasses
-- -----------------------------------------------------------------------------
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
CREATE INDEX IF NOT EXISTS idx_events_open ON public.events (is_open);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_public_read"
    ON public.events
    FOR SELECT
    TO anon, authenticated
    USING (is_open = true);

CREATE POLICY "events_admin_all"
    ON public.events
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 5. Projects & R&D Showcase
-- -----------------------------------------------------------------------------
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
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects (is_published);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects_public_read"
    ON public.projects
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "projects_admin_all"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 6. Team Members
-- -----------------------------------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_team_active ON public.team_members (is_active);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "team_members_public_read"
    ON public.team_members
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "team_members_admin_all"
    ON public.team_members
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 7. Frequently Asked Questions (FAQs)
-- -----------------------------------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs (category);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON public.faqs (is_published);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "faqs_public_read"
    ON public.faqs
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

CREATE POLICY "faqs_admin_all"
    ON public.faqs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 8. Testimonials & Student / Client Reviews
-- -----------------------------------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials (is_featured);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_public_read"
    ON public.testimonials
    FOR SELECT
    TO anon, authenticated
    USING (is_featured = true);

CREATE POLICY "testimonials_admin_all"
    ON public.testimonials
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 9. Institutional & Industry Partners
-- -----------------------------------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_partners_active ON public.partners (is_active);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partners_public_read"
    ON public.partners
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "partners_admin_all"
    ON public.partners
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 10. Site Settings (Key-Value Configuration)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings_public_read"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "site_settings_admin_all"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
