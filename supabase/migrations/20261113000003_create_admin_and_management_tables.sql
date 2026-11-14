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

