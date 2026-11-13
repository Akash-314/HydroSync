/**
 * HydroSync Innovations LLP — Supabase Storage Service
 *
 * Dedicated helpers for:
 * 1. Uploading applicant resumes to private bucket 'application-attachments'
 * 2. Generating time-limited signed URLs for authorized resume review
 * 3. Uploading public media to 'public-assets', 'project-media', 'gallery'
 * 4. Resolving public CDN URLs for published assets
 */

import { getActiveServerClient } from './server';
import { getSupabaseBrowserClient, isSupabaseConfigured } from './client';

export const STORAGE_BUCKETS = {
  ATTACHMENTS: 'application-attachments',
  PUBLIC_ASSETS: 'public-assets',
  PROJECT_MEDIA: 'project-media',
  GALLERY: 'gallery',
} as const;

export interface StorageUploadResult {
  success: boolean;
  path: string | null;
  publicUrl?: string | null;
  error: string | null;
}

/**
 * Upload an applicant attachment (Resume / Portfolio / Transcript)
 * Enforces file size limit (10MB) and allowed extensions (.pdf, .doc, .docx, .zip).
 */
export async function uploadApplicantAttachment(
  file: File | Blob,
  fileName: string,
  category: 'internship' | 'career'
): Promise<StorageUploadResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      path: null,
      error: 'Supabase storage is not configured yet. Attachment cannot be uploaded.',
    };
  }

  const client = (typeof window !== 'undefined' ? getSupabaseBrowserClient() : getActiveServerClient());
  if (!client) {
    return { success: false, path: null, error: 'Could not initialize Supabase storage client.' };
  }

  // Sanitize file extension
  const ext = fileName.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['pdf', 'doc', 'docx', 'zip'];
  if (!ext || !allowedExtensions.includes(ext)) {
    return {
      success: false,
      path: null,
      error: 'Invalid file format. Allowed formats: PDF, DOC, DOCX, ZIP.',
    };
  }

  // 10 MB file size limit
  if (file.size > 10 * 1024 * 1024) {
    return {
      success: false,
      path: null,
      error: 'File size exceeds maximum allowed limit of 10 MB.',
    };
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${category}/${timestamp}/${Date.now()}_${randomSuffix}_${cleanName}`;

  try {
    const { data, error } = await client.storage
      .from(STORAGE_BUCKETS.ATTACHMENTS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('[Storage] Upload failed:', error.message);
      return { success: false, path: null, error: error.message };
    }

    return {
      success: true,
      path: data.path,
      error: null,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown storage upload error';
    return { success: false, path: null, error: msg };
  }
}

/**
 * Generate a time-limited signed URL to securely read a private applicant attachment.
 * Defaults to 60 minutes expiry.
 */
export async function getAttachmentSignedUrl(
  path: string,
  expiresInSeconds: number = 3600
): Promise<{ url: string | null; error: string | null }> {
  const client = getActiveServerClient();
  if (!client) {
    return { url: null, error: 'Server storage client unavailable.' };
  }

  try {
    const { data, error } = await client.storage
      .from(STORAGE_BUCKETS.ATTACHMENTS)
      .createSignedUrl(path, expiresInSeconds);

    if (error) {
      return { url: null, error: error.message };
    }

    return { url: data.signedUrl, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error generating signed URL';
    return { url: null, error: msg };
  }
}

/**
 * Resolve the public CDN URL for an object stored in a public bucket.
 */
export function getPublicMediaUrl(
  bucket: 'public-assets' | 'project-media' | 'gallery',
  path: string
): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl || !path) return null;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
