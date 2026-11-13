-- =============================================================================
-- Migration: 20261113000002_create_storage_buckets.sql
-- Description: Provision storage buckets and storage.objects Row Level Security (RLS)
-- Project: HydroSync Innovations LLP
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Insert Storage Buckets
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    (
        'application-attachments',
        'application-attachments',
        false,
        10485760, -- 10 MB in bytes
        ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-zip-compressed']
    ),
    (
        'public-assets',
        'public-assets',
        true,
        20971520, -- 20 MB in bytes
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
    ),
    (
        'project-media',
        'project-media',
        true,
        26214400, -- 25 MB in bytes
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
    ),
    (
        'gallery',
        'gallery',
        true,
        26214400, -- 25 MB in bytes
        ARRAY['image/png', 'image/jpeg', 'image/webp']
    )
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- -----------------------------------------------------------------------------
-- 2. Storage Objects RLS Policies
-- -----------------------------------------------------------------------------

-- A. Public Read Policy for Public Buckets ('public-assets', 'project-media', 'gallery')
CREATE POLICY "public_read_public_buckets"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id IN ('public-assets', 'project-media', 'gallery'));

-- B. Anonymous Applicant Upload to application-attachments (Resumes, Portfolios)
-- Restricts insertion to application-attachments bucket with valid mime types
CREATE POLICY "allow_applicant_upload_attachments"
    ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        bucket_id = 'application-attachments' AND
        (storage.extension(name) IN ('pdf', 'doc', 'docx', 'zip'))
    );

-- C. Private Read Access for application-attachments (Admin & Signed URLs)
CREATE POLICY "allow_admin_read_attachments"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'application-attachments');

-- D. Admin Full Control over all storage buckets
CREATE POLICY "allow_admin_manage_all_storage"
    ON storage.objects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
