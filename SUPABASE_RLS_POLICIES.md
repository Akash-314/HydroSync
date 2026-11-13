# HydroSync Innovations LLP — Row Level Security (RLS) Policy Guide

This document details the Row Level Security (RLS) policies implemented across all PostgreSQL tables and storage buckets for **HydroSync Innovations LLP**.

---

## 1. Security Objectives & Threats Mitigated

1. **Information Leakage Prevention:** Public users must NEVER be able to read contact messages, applicant resumes, phone numbers, email addresses, or institutional tie-up inquiries.
2. **Tampering Protection:** Public users must NEVER be able to update or delete submitted inquiries or catalog records.
3. **Spam & Injection Prevention:** Database check constraints reject malformed submissions at the database layer even if client-side validation is bypassed.
4. **Principle of Least Privilege:** Public clients operate with the `anon` role, possessing exclusively INSERT permissions on submission tables and SELECT permissions on published catalog content.

---

## 2. Table-by-Table Policy Audit Matrix

| Table Name | RLS Enabled? | Public INSERT | Public SELECT | Public UPDATE / DELETE | Admin Access |
|---|---|---|---|---|---|
| `contact_enquiries` | **YES** | **ALLOWED** (Strict validation check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `internship_applications` | **YES** | **ALLOWED** (Strict validation check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `course_enquiries` | **YES** | **ALLOWED** (Strict validation check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `event_registrations` | **YES** | **ALLOWED** (Seat bounds check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `institutional_enquiries` | **YES** | **ALLOWED** (Strict validation check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `career_applications` | **YES** | **ALLOWED** (Strict validation check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `newsletter_subscriptions` | **YES** | **ALLOWED** (Email regex check) | **DENIED** | **DENIED** | Full (Authenticated) |
| `courses` | **YES** | **DENIED** | **ALLOWED** (`is_published = true`) | **DENIED** | Full (Authenticated) |
| `internship_programs` | **YES** | **DENIED** | **ALLOWED** (`is_active = true`) | **DENIED** | Full (Authenticated) |
| `services` | **YES** | **DENIED** | **ALLOWED** (`is_active = true`) | **DENIED** | Full (Authenticated) |
| `events` | **YES** | **DENIED** | **ALLOWED** (`is_open = true`) | **DENIED** | Full (Authenticated) |
| `projects` | **YES** | **DENIED** | **ALLOWED** (`is_published = true`) | **DENIED** | Full (Authenticated) |
| `team_members` | **YES** | **DENIED** | **ALLOWED** (`is_active = true`) | **DENIED** | Full (Authenticated) |
| `faqs` | **YES** | **DENIED** | **ALLOWED** (`is_published = true`) | **DENIED** | Full (Authenticated) |
| `testimonials` | **YES** | **DENIED** | **ALLOWED** (`is_featured = true`) | **DENIED** | Full (Authenticated) |
| `partners` | **YES** | **DENIED** | **ALLOWED** (`is_active = true`) | **DENIED** | Full (Authenticated) |
| `site_settings` | **YES** | **DENIED** | **ALLOWED** (Public site flags) | **DENIED** | Full (Authenticated) |

---

## 3. Storage Objects Security Policies (`storage.objects`)

| Bucket | Action | Role | Policy Rule | Rationale |
|---|---|---|---|---|
| `application-attachments` | `INSERT` | `anon`, `authenticated` | `storage.extension(name) IN ('pdf', 'doc', 'docx', 'zip')` | Allows applicants to upload resumes while preventing malicious executable scripts. |
| `application-attachments` | `SELECT` | `authenticated` | `bucket_id = 'application-attachments'` | Protects candidate privacy. Public direct URLs return HTTP 403 Forbidden. Signed URLs required. |
| `public-assets` | `SELECT` | `anon`, `authenticated` | `bucket_id IN ('public-assets', ...)` | Allows unrestricted public distribution of marketing brochures and syllabi. |
| `project-media` | `SELECT` | `anon`, `authenticated` | `bucket_id IN ('project-media', ...)` | Allows public rendering of project schematics and hardware photos. |
| `gallery` | `SELECT` | `anon`, `authenticated` | `bucket_id IN ('gallery', ...)` | Allows public display of event and lab photography. |
| All Buckets | `ALL` | `authenticated` | `USING (true) WITH CHECK (true)` | Grants full administrative management to verified HydroSync staff. |

---

## 4. RLS Verification Command
To verify that Row Level Security is active and blocking unauthorized public reads, run:
```bash
node -e "
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
s.from('contact_enquiries').select('*').then(r => console.log('RLS Status:', r.data?.length === 0 ? 'PROTECTED (Empty/Denied)' : 'LEAK'));
"
```
