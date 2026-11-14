# HydroSync Innovations LLP — Content Management Guide (Page CMS)

This guide explains how company marketing editors and content managers can visually customize copy, images, and buttons across all 22 public pages without editing code.

---

## 1. Page Catalog Overview

Navigate to `/admin/pages` to see the full directory of manageable pages:
- **Core Pages**: Home (`/`), About (`/about`), Services (`/services`), Contact (`/contact`).
- **Academic & Labs**: Internships (`/internships`), Courses (`/courses`), Live Classes (`/live-classes`), Events (`/events`).
- **Institutional Tracks**: For Schools (`/for-schools`), For Colleges (`/for-colleges`).
- **Showcases**: Project Showcase (`/projects`), Engineering Team (`/team`), Hardware Gallery (`/gallery`), Testimonials (`/testimonials`), Hardware Kits (`/hardware-kits`), Curriculum (`/curriculum`), Technical Blog (`/blog`).
- **Governance & Compliance**: Privacy Policy (`/privacy-policy`), Terms (`/terms`), Refund Policy (`/refund-policy`), Careers (`/careers`).

---

## 2. Structured Section Editor

Click **Edit Content** on any page to open the visual editor (`/admin/pages/[slug]`):

### Section Attributes
Each section can be customized with:
1. **Section Key**: Machine identifier (e.g. `hero`, `curriculum_summary`, `hardware_specs`).
2. **Title / Heading**: Primary visual headline.
3. **Subtitle**: Supporting lead sentence or category badge.
4. **Body Content**: Detailed explanatory prose with full markdown support (headings, bullets, bolding, code snippets).
5. **Media URL**: Public CDN URL or local image path.
6. **Primary & Secondary Call to Actions**:
   - `Primary CTA Text` (e.g. *Apply for Summer 2026 Cohort*) & `URL` (e.g. `/internships`).
   - `Secondary CTA Text` (e.g. *Download Syllabus PDF*) & `URL`.
7. **Visibility Toggle**: Easily toggle sections on or off without deleting their content.
8. **Reordering**: Move sections up or down using the arrow controls.

---

## 3. Version History & Rollback

Every time you click **Save & Publish Changes**:
- An immutable snapshot is recorded in `content_revisions` with a sequential version number, editor identity, and timestamp.
- Switch to the **Version History** tab at any time to review past revisions and click **Restore This Version** with 1-click instant rollback.
