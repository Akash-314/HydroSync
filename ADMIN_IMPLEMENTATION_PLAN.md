# HydroSync Innovations LLP — Admin Panel & Business Management System Implementation Plan

**Author:** Principal Full-Stack Architect, Senior Next.js Engineer, Supabase Database Architect  
**Project:** HydroSync Innovations LLP  
**Date:** November 2026  
**Status:** Architecture Approved — Phase 1 Complete  

---

## 1. Executive Summary & Objective

The objective is to extend the HydroSync Innovations LLP corporate platform with an enterprise-grade, non-technical **Admin Panel & Business Management Portal** accessible at `/admin`.

This portal allows authorized company managers to operate the entire website without touching code:
- Manage courses, syllabi, fees, and batches.
- Manage internship programs, application form fields, and candidate pipelines following the **Nexonix Reflexo** workflow.
- Review student applications, inspect resumes via secure time-limited signed URLs, update candidate statuses, record private notes, and view status history.
- Manage upcoming and past workshops, events, and participant registrations.
- Manage projects, team members, gallery photography, testimonials, and blog articles.
- Edit page sections (headings, text, CTAs, media, order, visibility) across all 22 website pages.
- Access a centralized submission inbox for all 7 inquiry and application streams with search, filters, and CSV export.
- Manage media assets in Supabase Storage with category folders and validation.
- Configure global corporate settings (contact details, social channels, navigation links, SEO).
- Enforce strict server-side Role-Based Access Control (RBAC) via Supabase Authentication.

---

## 2. Architecture & Design Principles

### 2.1 Non-Destructive Extension
- **Zero Framework Migration:** Retains Next.js 15 App Router, TypeScript, Tailwind CSS, and Supabase.
- **Zero Breaking Changes:** All public routes (`/`, `/courses`, `/internships`, `/contact`, etc.) continue functioning normally with their established Midnight Sky design.
- **Hybrid Data Pipeline:** Public pages query dynamic Supabase records when published, with seamless fallback to static catalog data if the database is unseeded or pending migration.

### 2.2 Layout Separation
- The public website uses the global `Navbar` and `Footer`.
- The Admin Portal (`/admin/*`) uses an isolated, high-productivity dashboard layout with:
  - Collapsible, responsive navigation sidebar.
  - Compact administrative header with quick search, breadcrumbs, role badge, theme toggle, and profile dropdown.
  - Full-screen distraction-free layout for `/admin/login`.

### 2.3 Nexonix Reflexo Internship Workflow Reference
- **Program Definition:** Manage tracks, domains (IoT, Embedded Systems, Edge AI, Web, Python), durations, modes, stipend indicators, and capacity.
- **Form Configuration:** Customize application form fields (labels, requirements, field types) without code modifications.
- **Candidate Pipeline:** Structured multi-stage funnel:
  `New` ➔ `Under Review` ➔ `Shortlisted` ➔ `Selected` ➔ `Rejected` ➔ `Withdrawn`.
- **Application History:** Every status transition is automatically logged in `application_status_history` with timestamp, reviewer ID, and internal notes.
- **Private Data Protection:** Resumes remain in private storage (`application-attachments`); managers view them exclusively via expiring signed URLs.

---

## 3. Database Schema Extensions (Supabase PostgreSQL)

The following tables extend our schema without dropping or altering existing tables:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             ADMIN & SECURITY                                │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ admin_users             │ admin_activity_logs     │ application_status_hist │
│ - id (auth.users FK)    │ - id                    │ - id                    │
│ - email, full_name      │ - admin_id (FK)         │ - application_id (FK)   │
│ - role (owner/mgr/etc)  │ - action, entity_type   │ - old_status, new_status│
│ - is_active             │ - entity_id, details    │ - changed_by, notes     │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BATCHES & FORM FIELDS                             │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ course_batches          │ internship_batches      │ internship_form_fields  │
│ - id, course_id (FK)    │ - id, program_id (FK)   │ - id, field_key, label  │
│ - batch_name, dates     │ - batch_code, dates     │ - field_type, required  │
│ - capacity, is_open     │ - capacity, is_active   │ - display_order, enabled│
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CMS & CONTENT REVISIONS                           │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ page_contents           │ content_revisions       │ blog_posts              │
│ - id, page_slug         │ - id, page_slug         │ - id, slug, title       │
│ - section_key, title    │ - version_number        │ - content_markdown      │
│ - content, media_url    │ - snapshot (JSONB)      │ - cover_image, category │
│ - is_published, status  │ - created_by, created_at│ - is_published, dates   │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 4. Role-Based Access Control (RBAC) Matrix

| Role | Admin Users | Website Settings | Content / Pages | Courses / Batches | Internships / Batches | Applicant Review | Storage / Media | CSV Export |
|---|---|---|---|---|---|---|---|---|
| **Owner / Super Admin** | Full | Full | Full | Full | Full | Full | Full | Full |
| **Manager** | Read-Only | Read-Only | Full | Full | Full | Full | Full | Full |
| **Course Manager** | None | None | Courses Only | Full | Read-Only | Read-Only | Upload Only | Permitted |
| **Internship Manager** | None | None | Internships Only| Read-Only | Full | Full | Upload Only | Permitted |
| **Content Editor** | None | None | Full | View Only | View Only | None | Upload Only | None |

---

## 5. Implementation Phases & Milestones

1. **Phase 1: Inspection & Implementation Plan** (Current Document)
2. **Phase 2: Database Migration & RLS Security**
   - Migration `20261113000003_create_admin_and_management_tables.sql`.
   - Master migration update `supabase/migrations/20261113_master_schema_and_storage.sql`.
   - Update TypeScript types in `src/lib/supabase/types.ts`.
3. **Phase 3: Authentication & Server Authorization**
   - Supabase SSR cookie clients (`src/lib/supabase/server-auth.ts`, `src/lib/supabase/middleware.ts`).
   - Server-side authorization helper `verifyAdminSession()`.
   - Login page `/admin/login` and logout API `/api/admin/auth/logout`.
4. **Phase 4: Core Admin Layout & Shell**
   - Layout wrapper in `src/components/layout/site-layout-wrapper.tsx`.
   - Admin layout `src/app/admin/layout.tsx` with sidebar, header, navigation, and breadcrumbs.
5. **Phase 5: Admin Dashboard Overview**
   - `/admin` home with live statistics, recent submissions, activity logs, and quick actions.
6. **Phase 6: Course Management System**
   - `/admin/courses` (CRUD, category filter, syllabus builder, batch management, applicants).
7. **Phase 7: Internship Management System (Nexonix Reflexo Workflow)**
   - `/admin/internships` (programs CRUD, batch management, dynamic form fields).
   - `/admin/internships/applications` (pipeline board, detail modal, signed resume view, status change history, notes, CSV export).
8. **Phase 8: Events, Projects, Team, Gallery, and Blog Management**
   - Dedicated management modules with image uploads, status toggles, and reordering.
9. **Phase 9: Centralized Submission Inbox**
   - `/admin/submissions` (unified inbox for all 7 inquiry streams with search, filter, and CSV export).
10. **Phase 10: Media Library**
    - `/admin/media` (Supabase Storage explorer, folder organization, upload with MIME/size validation, copy URL).
11. **Phase 11: Website Settings & Page CMS**
    - `/admin/settings` (brand, contact, navigation, SEO).
    - `/admin/pages` (visual structured section editor for all 22 pages with draft/preview/publish).
12. **Phase 12: Public Website Integration & On-Demand Revalidation**
    - Connect public catalog pages to query Supabase dynamic tables with static fallbacks.
    - Wire `revalidatePath` on publish actions.
13. **Phase 13: Testing, Verification & Comprehensive Documentation**
    - Type check, build check, and authoring of all 9 required documentation guides.

---

## 6. Verification & Acceptance Criteria
- `/admin` protected against unauthorized access.
- Every major feature manageable through intuitive UI.
- Real database persistence without mock data.
- Zero regression on public pages.
- Production build passes cleanly with zero errors.

