# HydroSync Innovations LLP — Admin Panel Architecture

This document provides a comprehensive overview of the design, security architecture, data flow, and role-based permissions implemented for the HydroSync Management Portal.

---

## 1. High-Level Architecture Overview

The Management Portal is engineered as a secure, full-stack administrative platform integrated directly inside the existing Next.js 15 application without separating codebases or breaking public SSR routes.

```
+-------------------------------------------------------------------------+
|                           HydroSync Web App                             |
|                                                                         |
|   +-----------------------+           +-----------------------------+   |
|   |    Public Website     |           |     Admin Portal (/admin)   |   |
|   | (Dark Midnight Sky)   |           |  (Theme-Aware Glass Studio) |   |
|   |  - /courses           |           |  - Overview Dashboard       |   |
|   |  - /internships       |           |  - Course Management        |   |
|   |  - /events            |           |  - Candidate Pipeline (NLR) |   |
|   |  - /projects          |           |  - Submissions Inbox        |   |
|   |  - /team              |           |  - Storage Media Library    |   |
|   |  - /gallery           |           |  - Site Settings & CMS      |   |
|   +-----------------------+           +-----------------------------+   |
|               |                                       |                 |
|               | (Dynamic fetch / fallback)            | (Cookie SSR Auth|
|               v                                       |  & RBAC Guard)  |
|   +-----------------------------------------------------------------+   |
|   |                    Next.js API & Middleware                     |   |
|   |  - verifyAdminSession() with server-side admin_users validation |   |
|   |  - logAdminActivity() for complete immutable audit trail        |   |
|   |  - On-Demand Cache Invalidation (revalidatePath)                |   |
|   +-----------------------------------------------------------------+   |
|                                       |                                 |
+---------------------------------------|---------------------------------+
                                        v
+-------------------------------------------------------------------------+
|                        Supabase Cloud Platform                          |
|                                                                         |
|   +---------------------------+       +-----------------------------+   |
|   |     PostgreSQL Database   |       |       Supabase Storage      |   |
|   |  - 27 Relational Tables   |       |  - public-assets            |   |
|   |  - Row Level Security     |       |  - project-media            |   |
|   |  - Auto updated_at trg    |       |  - gallery                  |   |
|   |  - Audit & Revision Logs  |       |  - application-attachments  |   |
|   +---------------------------+       +-----------------------------+   |
+-------------------------------------------------------------------------+
```

---

## 2. Authentication & Authorization Flow

### Security Guarantees
1. **Zero Public Self-Registration**: Registration is strictly closed to the general public. Admin accounts can only be provisioned by the `owner` or `super_admin` through `/admin/team-access`.
2. **Server-Side Validation**: Client-provided JWT tokens or local storage values are never trusted for authorization. The server queries the `admin_users` table directly on every request using `verifyAdminSession()`.
3. **Session Cookie Isolation**: Admin authentication is maintained via secure HTTP cookies managed by `@supabase/ssr`.
4. **Clean Route Isolation**: The public Navbar and Footer are automatically omitted on all `/admin/*` routes via `SiteLayoutWrapper`, preventing layout leakage or visual artifacts.

### RBAC Permission Matrix

| Role | Access Scope | Course/Program CRUD | Candidate Pipeline | Content & Pages | System Settings | User Management |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Owner** | Full Unrestricted Root | Yes | Yes | Yes | Yes | Yes |
| **Super Admin** | Full Operations | Yes | Yes | Yes | Yes | Yes |
| **Manager** | Business & Academic Ops | Yes | Yes | Yes | Yes | Read-only |
| **Course Manager** | Academic Offerings | Yes | Read-only | Read-only | Read-only | No |
| **Internship Manager** | Candidate Review & Pipelines | Read-only | Full (Nexonix workflow) | Read-only | No | No |
| **Content Editor** | CMS, Blog & Gallery | Read-only | No | Full | No | No |

---

## 3. Candidate Pipeline Workflow (Nexonix Reflexo Standard)

Modeled after modern technical hiring workflows:
1. **New (`pending`)**: Newly submitted application from the public site.
2. **Under Review (`reviewed`)**: Application actively reviewed by the admissions committee.
3. **Shortlisted (`shortlisted`)**: Candidate passed portfolio and academic checks.
4. **Selected (`accepted`)**: Offer of internship issued to the student.
5. **Rejected (`rejected`)**: Candidate notified with respectful rejection note.
6. **Withdrawn**: Application withdrawn or deferred.

### Secure Resume Access
Candidate resumes are stored in the private `application-attachments` Supabase bucket. Direct public links are blocked by RLS policies. The pipeline generates temporary time-limited HMAC-signed URLs (`getAttachmentSignedUrl`) valid for 3,600 seconds exclusively for authorized managers.

---

## 4. On-Demand Revalidation Architecture

When administrators publish or update courses, internships, workshops, projects, team members, or CMS sections, the server actions immediately dispatch Next.js `revalidatePath()` for:
- The specific detail page (e.g. `/courses/[slug]`, `/projects/[slug]`)
- The parent catalog route (e.g. `/courses`, `/internships`, `/events`, `/projects`)
- The global layout and home page (`/`)

This ensures changes reflect instantaneously for global users without requiring build redeployments.
