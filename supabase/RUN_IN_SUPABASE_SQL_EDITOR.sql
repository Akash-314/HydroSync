-- =============================================================================
-- HYDROSYNC INNOVATIONS LLP — COMPLETE CONSOLIDATED DATABASE SYNC & PERMISSIONS
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 0. SCHEMA & ROLE PRIVILEGES (CRITICAL TO FIX 42501 PERMISSION DENIED)
-- -----------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 1. UTILITY FUNCTIONS
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 2. ADMIN PORTAL, CMS & MANAGEMENT TABLES
-- -----------------------------------------------------------------------------

-- Admin Users & Membership
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

DROP POLICY IF EXISTS "admin_users_self_or_super_admin" ON public.admin_users;
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

DROP POLICY IF EXISTS "admin_users_super_admin_manage" ON public.admin_users;
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

DROP POLICY IF EXISTS "admin_users_service_role" ON public.admin_users;
CREATE POLICY "admin_users_service_role"
    ON public.admin_users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Admin Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON public.admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_audit_logs_read" ON public.admin_audit_logs;
CREATE POLICY "admin_audit_logs_read"
    ON public.admin_audit_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.role IN ('owner', 'super_admin') AND au.is_active = true
        )
    );

DROP POLICY IF EXISTS "admin_audit_logs_insert" ON public.admin_audit_logs;
CREATE POLICY "admin_audit_logs_insert"
    ON public.admin_audit_logs
    FOR INSERT
    TO authenticated, service_role
    WITH CHECK (true);

-- Candidate Status History
CREATE TABLE IF NOT EXISTS public.candidate_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_candidate_history_app_id ON public.candidate_status_history(application_id);

ALTER TABLE public.candidate_status_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "candidate_history_admin" ON public.candidate_status_history;
CREATE POLICY "candidate_history_admin"
    ON public.candidate_status_history
    FOR ALL
    TO authenticated, service_role
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    );

-- Batches
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_type TEXT NOT NULL CHECK (program_type IN ('course', 'internship')),
    program_id UUID,
    title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    capacity INT NOT NULL DEFAULT 30,
    enrolled_count INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'enrolling', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "batches_public_read" ON public.batches;
CREATE POLICY "batches_public_read"
    ON public.batches
    FOR SELECT
    TO anon, authenticated
    USING (status IN ('upcoming', 'enrolling', 'in_progress'));

DROP POLICY IF EXISTS "batches_admin_all" ON public.batches;
CREATE POLICY "batches_admin_all"
    ON public.batches
    FOR ALL
    TO authenticated, service_role
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    );

-- Form Field Configurations
CREATE TABLE IF NOT EXISTS public.form_field_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL,
    field_key TEXT NOT NULL,
    field_label TEXT NOT NULL,
    field_type TEXT NOT NULL DEFAULT 'text',
    is_required BOOLEAN NOT NULL DEFAULT false,
    options JSONB DEFAULT '[]'::jsonb,
    placeholder TEXT,
    help_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (form_type, field_key)
);

ALTER TABLE public.form_field_configs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "form_fields_public_read" ON public.form_field_configs;
CREATE POLICY "form_fields_public_read"
    ON public.form_field_configs
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

DROP POLICY IF EXISTS "form_fields_admin_all" ON public.form_field_configs;
CREATE POLICY "form_fields_admin_all"
    ON public.form_field_configs
    FOR ALL
    TO authenticated, service_role
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    );

-- Page Sections CMS
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    section_key TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    badge TEXT,
    content TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (page_slug, section_key)
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "page_sections_public_read" ON public.page_sections;
CREATE POLICY "page_sections_public_read"
    ON public.page_sections
    FOR SELECT
    TO anon, authenticated
    USING (is_visible = true);

DROP POLICY IF EXISTS "page_sections_admin_all" ON public.page_sections;
CREATE POLICY "page_sections_admin_all"
    ON public.page_sections
    FOR ALL
    TO authenticated, service_role
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    );

-- Blog Posts & Resources
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

DROP POLICY IF EXISTS "blog_posts_public_read" ON public.blog_posts;
CREATE POLICY "blog_posts_public_read"
    ON public.blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_all"
    ON public.blog_posts
    FOR ALL
    TO authenticated, service_role
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users au
            WHERE au.id = auth.uid() AND au.is_active = true
        ) OR auth.role() = 'service_role'
    );

-- Gallery Items Table
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

DROP POLICY IF EXISTS "Allow public read published gallery items" ON public.gallery_items;
CREATE POLICY "Allow public read published gallery items"
    ON public.gallery_items FOR SELECT
    USING (is_published = TRUE);

DROP POLICY IF EXISTS "Allow service role full access to gallery items" ON public.gallery_items;
CREATE POLICY "Allow service role full access to gallery items"
    ON public.gallery_items FOR ALL
    USING (auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid() AND au.is_active = true))
    WITH CHECK (auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid() AND au.is_active = true));

DROP TRIGGER IF EXISTS trg_gallery_items_updated_at ON public.gallery_items;
CREATE TRIGGER trg_gallery_items_updated_at
    BEFORE UPDATE ON public.gallery_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 3. FINAL COMPREHENSIVE PRIVILEGE RE-GRANT
-- -----------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

