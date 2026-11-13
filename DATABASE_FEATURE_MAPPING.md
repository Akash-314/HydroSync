# HydroSync Innovations LLP — Database Feature Mapping

This document provides the exhaustive, feature-to-database architectural mapping for every interactive, persistent, and content capability across the **HydroSync Innovations LLP** website.

---

## 1. Feature to Database Table & Storage Mapping

| # | Feature Name | UI Component / Route | HTTP / Service Layer | Target Database Table | Storage Bucket | Data Stored / Handled |
|---|---|---|---|---|---|---|
| 1 | **Contact Enquiries** | `src/components/forms/contact-form.tsx`<br>`/contact` | `POST /api/contact`<br>`db.contact()` | `contact_enquiries` | — | Full name, email, phone, category, detailed message, status, timestamp. |
| 2 | **Internship Applications** | `src/components/forms/apply-form.tsx`<br>`/apply`, `/internships` | `POST /api/internships`<br>`db.internships()` | `internship_applications` | `application-attachments` (Private) | Candidate name, email, phone, college, branch, year of study, program track, mode, resume URL, cover note. |
| 3 | **Course Enquiries** | `src/components/forms/apply-form.tsx`<br>`/courses` | `POST /api/courses`<br>`db.courses()` | `course_enquiries` | — | Student name, email, phone, college, course track, learning mode, message. |
| 4 | **Event & Masterclass Registrations** | `src/components/forms/apply-form.tsx`<br>`/events` | `POST /api/events`<br>`db.events()` | `event_registrations` | — | Attendee name, email, phone, college, event name, session type, attendee count, questions. |
| 5 | **Institutional & College MoUs** | `src/components/forms/apply-form.tsx`<br>`/for-colleges`, `/for-schools` | `POST /api/institutional`<br>`db.institutional()` | `institutional_enquiries` | — | Institution type, legal institution name, contact person, designation, email, phone, city, state, program interest, student cohort size. |
| 6 | **Career Applications** | `src/components/forms/apply-form.tsx`<br>`/careers` | `POST /api/careers`<br>`db.careers()` | `career_applications` | `application-attachments` (Private) | Applicant name, email, phone, position applied, experience years, LinkedIn/portfolio link, resume URL, cover letter. |
| 7 | **Newsletter Subscriptions** | `src/components/forms/newsletter-form.tsx`<br>Global Footer | `POST /api/newsletter`<br>`db.newsletter()` | `newsletter_subscriptions` | — | Validated email, source page route, active subscription boolean, timestamp. |
| 8 | **Technical Course Catalog** | `/courses` | `db.getCourses()` | `courses` | `public-assets` (Syllabi) | Course title, slug, level, duration, price, syllabus, prerequisites, hardware tools, publication status. |
| 9 | **Internship Programs Catalog** | `/internships` | `db.getInternshipPrograms()` | `internship_programs` | `public-assets` (Brochures) | Program title, slug, domain, duration, mode, eligibility, learning outcomes, seats available. |
| 10 | **Engineering Services & Capabilities** | `/services` | `db.getServices()` | `services` | `public-assets` | Service title, slug, category, summary, detailed scope, deliverables, technologies. |
| 11 | **Workshops & Event Schedule** | `/events` | `db.getEvents()` | `events` | `gallery` | Event title, slug, type, dates, venue, mode, speaker name, max seats, seat counters. |
| 12 | **Projects & R&D Showcase** | `/projects` | `db.getProjects()` | `projects` | `project-media` (Schematics) | Project title, slug, category, client type, problem statement, technical solution, hardware/firmware stack, metrics. |
| 13 | **Engineering Laboratory Team** | `/team` | `db.getTeam()` | `team_members` | `public-assets` (Avatars) | Full name, role, department, biography, avatar URL, LinkedIn URL, display order. |
| 14 | **Frequently Asked Questions** | `/faq` | `db.getFaqs()` | `faqs` | — | Question, answer, category, display order, publication status. |
| 15 | **Student & Client Testimonials** | `/testimonials` | `db.getTestimonials()` | `testimonials` | `public-assets` (Avatars) | Author name, title, organization, quote, rating, featured flag. |
| 16 | **Institutional Partners & MoUs** | `/partners` | `db.getPartners()` | `partners` | `public-assets` (Logos) | Partner name, institution type, logo URL, website, active flag. |
| 17 | **Global Site Configuration** | Layout / Navbar / Footer | Direct query | `site_settings` | `public-assets` (Logos) | Key-value settings, platform status, announcement banners. |

---

## 2. Data Flow Architecture

```
[Browser / Client Component]
       │
       ▼ (Client Form Submission or Public Fetch)
[Next.js App Router API Route / Server Action]
       │  (Honeypot check, input sanitization, phone normalization, email regex)
       ▼
[src/lib/supabase/services Layer]
       │
       ├─► [Supabase PostgreSQL (Tables protected with Row Level Security)]
       │
       └─► [Supabase Storage (Private attachments via signed URLs; Public media via CDN)]
```
