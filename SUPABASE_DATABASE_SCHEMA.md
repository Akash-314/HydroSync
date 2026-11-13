# HydroSync Innovations LLP — PostgreSQL Database Schema Specification

This document provides the exhaustive, production-grade schema definition for the **HydroSync Innovations LLP** corporate and technical platform on Supabase PostgreSQL.

---

## 1. Schema Architecture & Design Principles

- **Data Integrity:** Strict PostgreSQL column data types (`UUID`, `TIMESTAMPTZ`, `TEXT`, `NUMERIC`, `JSONB`, `BOOLEAN`, `ARRAY`).
- **Security by Default:** Row Level Security (RLS) enabled on all 17 tables.
- **Normalization:** 3NF normalization for dynamic catalogs and public content; denormalized metadata in `JSONB` for extensible tracking and CRM synchronization.
- **Audit Trails:** Automatic `created_at` and `updated_at` timestamps using `timezone('utc'::text, now())`.
- **Constraint Enforcement:** Check constraints on email regex, phone digit length, text length bounds, enum ranges, and foreign keys.

---

## 2. Submission Tables (Public Write, Admin Read)

### 2.1 `contact_enquiries`
Stores general contact inquiries, corporate requests, and advisory messages.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique submission identifier |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC last updated timestamp |
| `full_name` | `TEXT` | `NOT NULL CHECK (char_length(trim(full_name)) >= 2)` | Submitter full name |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')` | Validated email address |
| `phone` | `TEXT` | `NOT NULL CHECK (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10)` | Normalized phone digits |
| `category` | `TEXT` | `NOT NULL CHECK (category IN ('Internship', 'Course', 'School', 'College', 'Enterprise', 'Other'))` | Enquiry classification |
| `message` | `TEXT` | `NOT NULL CHECK (char_length(trim(message)) >= 5)` | Detailed enquiry description |
| `status` | `TEXT` | `NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'resolved', 'archived'))` | Operational processing state |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Browser client info, UTM tags, IP metadata |

**Indexes:**
- `idx_contact_enquiries_created_at` ON `(created_at DESC)`
- `idx_contact_enquiries_status` ON `(status)`
- `idx_contact_enquiries_email` ON `(email)`

---

### 2.2 `internship_applications`
Stores student and engineering candidate technical internship applications.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Record UUID |
| `application_id` | `TEXT` | `NOT NULL UNIQUE` | Human-readable tracking ID (`HS-INT-...`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC submission timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC last updated timestamp |
| `full_name` | `TEXT` | `NOT NULL CHECK (char_length(trim(full_name)) >= 2)` | Candidate full name |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '...')` | Candidate contact email |
| `phone` | `TEXT` | `NOT NULL CHECK (digits >= 10)` | Mobile number |
| `college` | `TEXT` | `NOT NULL CHECK (char_length(trim(college)) >= 2)` | University or college name |
| `branch` | `TEXT` | `NOT NULL CHECK (char_length(trim(branch)) >= 2)` | Academic engineering branch |
| `year_of_study`| `TEXT` | `NOT NULL` | 1st, 2nd, 3rd, 4th, or Graduate |
| `area_of_interest` | `TEXT` | `NULLABLE` | Specialization track |
| `preferred_program`| `TEXT` | `NOT NULL` | Selected internship program track |
| `preferred_mode` | `TEXT` | `NOT NULL CHECK (preferred_mode IN ('Online', 'Offline', 'Hybrid'))` | Delivery format |
| `resume_url` | `TEXT` | `NULLABLE` | Storage path in `application-attachments` |
| `additional_message`| `TEXT` | `NULLABLE` | Candidate cover note |
| `status` | `TEXT` | `NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'accepted'))` | Review pipeline status |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Additional applicant attributes |

---

### 2.3 `course_enquiries`
Stores inquiries regarding specialized skill training and IoT/Embedded courses.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Record UUID |
| `enquiry_id` | `TEXT` | `NOT NULL UNIQUE` | Human-readable tracking ID (`HS-CRS-...`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `full_name` | `TEXT` | `NOT NULL CHECK (char_length(trim(full_name)) >= 2)` | Learner full name |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '...')` | Email address |
| `phone` | `TEXT` | `NOT NULL CHECK (digits >= 10)` | Phone number |
| `college` | `TEXT` | `NOT NULL` | College / Organization |
| `course_of_interest`| `TEXT`| `NOT NULL` | Course title / track |
| `learning_mode`| `TEXT` | `NOT NULL CHECK (learning_mode IN ('Online Live', 'Hands-on Classroom', 'Hybrid'))` | Learning mode |
| `message` | `TEXT` | `NULLABLE` | Specific requirements |
| `status` | `TEXT` | `NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'cancelled'))` | Pipeline stage |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Batch or referral parameters |

---

### 2.4 `event_registrations`
Stores registrations for technical workshops, live masterclasses, and webinars.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique record ID |
| `registration_id`| `TEXT` | `NOT NULL UNIQUE` | Tracking ID (`HS-EVT-...`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `full_name` | `TEXT` | `NOT NULL CHECK (char_length(trim(full_name)) >= 2)` | Attendee full name |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '...')` | Validated email address |
| `phone` | `TEXT` | `NOT NULL CHECK (digits >= 10)` | Attendee mobile |
| `college` | `TEXT` | `NOT NULL` | Institution |
| `event_or_class` | `TEXT` | `NOT NULL` | Event title |
| `session_type` | `TEXT` | `NOT NULL DEFAULT 'Event' CHECK (session_type IN ('Event', 'Masterclass', 'Workshop', 'Webinar'))` | Event type |
| `number_of_attendees`| `INT` | `NOT NULL DEFAULT 1 CHECK (number_of_attendees > 0 AND number_of_attendees <= 20)` | Group seat count |
| `message` | `TEXT` | `NULLABLE` | Questions for speaker |
| `status` | `TEXT` | `NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled'))` | Attendance status |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Pass codes, webinar tokens |

---

### 2.5 `institutional_enquiries`
Stores inquiries from universities, engineering colleges, polytechnics, and schools for MoUs, Atal Tinkering Labs (ATL), and Centers of Excellence (CoE).

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique UUID |
| `enquiry_id` | `TEXT` | `NOT NULL UNIQUE` | Tracking ID (`HS-INST-...`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `institution_type`| `TEXT` | `NOT NULL CHECK (institution_type IN ('school', 'college', 'university', 'polytechnic', 'corporate'))` | Academic institution category |
| `institution_name`| `TEXT` | `NOT NULL CHECK (char_length(trim(institution_name)) >= 3)` | Legal institution name |
| `contact_person` | `TEXT` | `NOT NULL CHECK (char_length(trim(contact_person)) >= 2)` | Dean, HOD, Principal, or Faculty Lead |
| `designation` | `TEXT` | `NULLABLE` | Institutional title |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '...')` | Institutional email |
| `phone` | `TEXT` | `NOT NULL CHECK (digits >= 10)` | Contact telephone |
| `city` | `TEXT` | `NULLABLE` | City location |
| `state` | `TEXT` | `NULLABLE` | State / Region |
| `program_interest`| `TEXT` | `NOT NULL` | MoU, ATL, IoT Lab setup, etc. |
| `estimated_students`| `INT` | `CHECK (estimated_students IS NULL OR estimated_students >= 1)` | Cohort size |
| `message` | `TEXT` | `NULLABLE` | Specific institutional agenda |
| `status` | `TEXT` | `NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_discussion', 'mou_drafted', 'active', 'archived'))` | Partnership lifecycle |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Accreditation / affiliation info |

---

### 2.6 `career_applications`
Stores job applications and talent submissions for engineering and training roles.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Record UUID |
| `application_id` | `TEXT` | `NOT NULL UNIQUE` | Tracking ID (`HS-CAR-...`) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `full_name` | `TEXT` | `NOT NULL CHECK (char_length(trim(full_name)) >= 2)` | Applicant name |
| `email` | `TEXT` | `NOT NULL CHECK (email ~* '...')` | Contact email |
| `phone` | `TEXT` | `NOT NULL CHECK (digits >= 10)` | Contact mobile |
| `position_applied`| `TEXT`| `NOT NULL` | Open vacancy role |
| `experience_years`| `TEXT` | `NULLABLE` | Work experience range |
| `portfolio_or_linkedin`| `TEXT`| `NULLABLE` | Professional URL |
| `resume_url` | `TEXT` | `NULLABLE` | Storage path in `application-attachments` |
| `cover_letter` | `TEXT` | `NULLABLE` | Applicant motivation letter |
| `status` | `TEXT` | `NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'shortlisted', 'rejected', 'offered'))` | Hiring status |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Interview notes, referral |

---

### 2.7 `newsletter_subscriptions`
Stores verified subscribers for the HydroSync Engineering Dispatch newsletter.

| Column | Type | Constraints / Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Subscription ID |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT timezone('utc'::text, now())` | UTC timestamp |
| `email` | `TEXT` | `NOT NULL UNIQUE CHECK (email ~* '...')` | Subscriber email address |
| `source_page` | `TEXT` | `NULLABLE` | Page where subscription was triggered |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT true` | Opt-in status |
| `metadata` | `JSONB` | `DEFAULT '{}'::jsonb` | Unsubscribe tokens, tags |

---

## 3. Dynamic Public Catalog Tables (Public Read, Admin Write)

| Table Name | Description | Key Columns | RLS Policy |
|---|---|---|---|
| `courses` | Dynamic technical course offerings | `id`, `slug`, `title`, `category`, `duration_weeks`, `price_inr`, `syllabus`, `is_published` | Public Read (`is_published = true`), Admin All |
| `internship_programs` | Available technical internship tracks | `id`, `slug`, `title`, `domain`, `duration`, `mode`, `is_active` | Public Read (`is_active = true`), Admin All |
| `services` | Industrial IoT and firmware engineering services | `id`, `slug`, `title`, `category`, `summary`, `technologies`, `is_active` | Public Read (`is_active = true`), Admin All |
| `events` | Upcoming and past workshops & masterclasses | `id`, `slug`, `title`, `event_type`, `start_date`, `venue`, `max_seats`, `is_open` | Public Read (`is_open = true`), Admin All |
| `projects` | Hardware and firmware R&D case studies | `id`, `slug`, `title`, `category`, `problem_statement`, `stack`, `featured`, `is_published` | Public Read (`is_published = true`), Admin All |
| `team_members` | Leadership and engineering laboratory staff | `id`, `full_name`, `role`, `department`, `avatar_url`, `linkedin_url`, `is_active` | Public Read (`is_active = true`), Admin All |
| `faqs` | Categorized answers for candidate inquiries | `id`, `question`, `answer`, `category`, `display_order`, `is_published` | Public Read (`is_published = true`), Admin All |
| `testimonials` | Student, institutional, and client endorsements | `id`, `author_name`, `author_title`, `organization`, `quote`, `rating`, `is_featured` | Public Read (`is_featured = true`), Admin All |
| `partners` | Verified academic, institutional, and corporate partners | `id`, `name`, `partner_type`, `logo_url`, `website`, `is_active` | Public Read (`is_active = true`), Admin All |
| `site_settings` | Global platform settings, flags, and announcements | `key` (PK), `value` (JSONB), `description`, `updated_at` | Public Read, Admin All |

---

## 4. Foreign Keys & Relational Integrity

- `course_enquiries.course_of_interest` optionally references `courses(title)` or `courses(slug)`.
- `internship_applications.preferred_program` optionally references `internship_programs(title)` or `internship_programs(slug)`.
- `event_registrations.event_or_class` optionally references `events(title)` or `events(slug)`.
- Unmatched or custom queries default gracefully without throwing foreign-key constraint violations on client forms.
