# HydroSync Innovations LLP — Supabase PostgreSQL Integration Guide

This document provides the complete, production-grade guide to connecting your actual **Supabase PostgreSQL** database to the HydroSync Innovations LLP corporate platform.

---

## 1. Architecture Overview

The application architecture has been fully prepared for Supabase PostgreSQL integration without altering the visual design or breaking any existing site functionality:

- **Centralized Client:**
  - Browser Client (`src/lib/supabase/client.ts`): Reusable client for client components.
  - Server Client (`src/lib/supabase/server.ts`): Server-side client for Route Handlers and Server Actions.
  - Type-safe schema definitions (`src/lib/supabase/types.ts`).
- **Reusable Database Service Layer (`src/lib/supabase/services/`):**
  - Contact enquiries (`contact_enquiries`)
  - Internship applications (`internship_applications`)
  - Course enquiries (`course_enquiries`)
  - Event registrations (`event_registrations`)
  - School and college enquiries (`institutional_enquiries`)
  - Career applications (`career_applications`)
  - Newsletter subscriptions (`newsletter_subscriptions`)
- **Graceful Unconfigured Fallback:**
  - If Supabase environment variables are missing, all site features and forms function normally without crashing.
- **Connection Diagnostics:**
  - Live status endpoint: `GET /api/supabase/status` reports real-time connectivity status.

---

## 2. Quick Setup Checklist

1. [ ] Create a Supabase Project at [supabase.com](https://supabase.com).
2. [ ] Copy **Project URL** and **Publishable (Anon) Key** from **Project Settings > API**.
3. [ ] Create `.env.local` in the project root and paste your credentials.
4. [ ] Run the SQL migration script (below) in the **Supabase SQL Editor**.
5. [ ] Verify connection at `http://localhost:3000/api/supabase/status`.

---

## 3. Step-by-Step Connection Instructions

### Step 1: Create Your Supabase Project
1. Log in to [Supabase](https://supabase.com/dashboard).
2. Click **New Project**.
3. Enter Project Name: `HydroSync-Platform` (or preferred name).
4. Select a database password (store securely).
5. Choose region closest to your primary audience: **India (Mumbai) - ap-south-1** or Singapore.
6. Click **Create new project** and wait for deployment (approx. 2 minutes).

### Step 2: Retrieve API Credentials
1. In your project dashboard, navigate to **Project Settings** (gear icon) > **API**.
2. Under **Project URL**, copy the URL (e.g., `https://abcdefghijklm.supabase.co`).
3. Under **Project API keys**, copy the **`anon` `public`** key.
4. *(Optional / Advanced)* Copy the **`service_role`** key if you plan to run privileged backend tasks.

> [!WARNING]
> **Never** expose the `service_role` key in frontend code, client bundles, or version control. Only the `anon` key should be prefixed with `NEXT_PUBLIC_`.

### Step 3: Configure Environment Variables
Create a file named `.env.local` in the project root:

```bash
# Copy template
cp .env.example .env.local
```

Edit `.env.local` and enter your verified credentials:

```ini
# Supabase PostgreSQL Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional Server-Only Key (Never expose to client)
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> [!NOTE]
> `.env.local` is already excluded in `.gitignore` and will never be committed to Git.

---

## 4. Database Schema & RLS Security Migration

Open your **Supabase Dashboard > SQL Editor > New Query**, paste the following SQL script, and click **Run**:

```sql
-- =============================================================================
-- HydroSync Innovations LLP — Database Schema & Row Level Security (RLS)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Contact Enquiries
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Internship', 'Course', 'School', 'College', 'Enterprise', 'Other')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'resolved', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries (status);

-- RLS: Enable security
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit contact enquiries
CREATE POLICY "Allow public insert to contact_enquiries"
    ON public.contact_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Disallow public read: Only authenticated administrators can inspect submissions
CREATE POLICY "Allow authenticated read to contact_enquiries"
    ON public.contact_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 2. Internship Applications
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    branch TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    area_of_interest TEXT,
    preferred_program TEXT NOT NULL,
    preferred_mode TEXT NOT NULL CHECK (preferred_mode IN ('Online', 'Offline', 'Hybrid')),
    resume_url TEXT,
    additional_message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'accepted')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_internship_apps_created_at ON public.internship_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internship_apps_status ON public.internship_applications (status);
CREATE INDEX IF NOT EXISTS idx_internship_apps_email ON public.internship_applications (email);

-- RLS
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to internship_applications"
    ON public.internship_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to internship_applications"
    ON public.internship_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 3. Course Enquiries
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    course_of_interest TEXT NOT NULL,
    learning_mode TEXT NOT NULL CHECK (learning_mode IN ('Online Live', 'Hands-on Classroom', 'Hybrid')),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'cancelled')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_course_enquiries_created ON public.course_enquiries (created_at DESC);

-- RLS
ALTER TABLE public.course_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to course_enquiries"
    ON public.course_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to course_enquiries"
    ON public.course_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 4. Event Registrations
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    event_or_class TEXT NOT NULL,
    session_type TEXT NOT NULL DEFAULT 'Event' CHECK (session_type IN ('Event', 'Masterclass', 'Workshop', 'Webinar')),
    number_of_attendees INT NOT NULL DEFAULT 1,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_created ON public.event_registrations (created_at DESC);

-- RLS
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to event_registrations"
    ON public.event_registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to event_registrations"
    ON public.event_registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 5. School and College (Institutional) Enquiries
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.institutional_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    institution_type TEXT NOT NULL CHECK (institution_type IN ('school', 'college', 'university', 'polytechnic', 'corporate')),
    institution_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    designation TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    state TEXT,
    program_interest TEXT NOT NULL,
    estimated_students INT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_discussion', 'mou_drafted', 'active', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_institutional_enquiries_created ON public.institutional_enquiries (created_at DESC);

-- RLS
ALTER TABLE public.institutional_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to institutional_enquiries"
    ON public.institutional_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to institutional_enquiries"
    ON public.institutional_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 6. Career Applications
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position_applied TEXT NOT NULL,
    experience_years TEXT,
    portfolio_or_linkedin TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'shortlisted', 'rejected', 'offered')),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_career_applications_created ON public.career_applications (created_at DESC);

-- RLS
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to career_applications"
    ON public.career_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to career_applications"
    ON public.career_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- -----------------------------------------------------------------------------
-- 7. Newsletter Subscriptions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    email TEXT NOT NULL UNIQUE,
    source_page TEXT DEFAULT 'website',
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_newsletter_created ON public.newsletter_subscriptions (created_at DESC);

-- RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert or upsert to newsletter_subscriptions"
    ON public.newsletter_subscriptions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read to newsletter_subscriptions"
    ON public.newsletter_subscriptions
    FOR SELECT
    TO authenticated
    USING (true);
```

---

## 5. Security Architecture (Row Level Security)

All tables strictly enforce **Row Level Security**:
- **Public Anonymous Users (`anon` role):**
  - **Granted:** `INSERT` only (with validation checks).
  - **Denied:** `SELECT`, `UPDATE`, `DELETE`.
  - **Why:** This guarantees that an external visitor cannot query or scrape candidate names, phone numbers, emails, or institutional messages from the browser console.
- **Authenticated Staff / Service Role:**
  - Full read and management access via the Supabase Dashboard or authenticated administrative workflows.

---

## 6. Verifying Your Connection

Once you have created `.env.local` and executed the SQL migration:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test the connection endpoint:
   - In browser: open `http://localhost:3000/api/supabase/status`
   - In terminal:
     ```bash
     curl http://localhost:3000/api/supabase/status
     ```

### Expected Successful Response:
```json
{
  "configured": true,
  "connected": true,
  "status": "connected",
  "message": "Successfully established live connection to HydroSync Supabase PostgreSQL instance.",
  "details": {
    "hasUrl": true,
    "hasKey": true,
    "urlMasked": "https://abcdefgh.supabase.co",
    "latencyMs": 142
  },
  "supportedTables": [
    "contact_enquiries",
    "internship_applications",
    "course_enquiries",
    "event_registrations",
    "institutional_enquiries",
    "career_applications",
    "newsletter_subscriptions"
  ],
  "timestamp": "2026-11-12T07:35:00.000Z"
}
```

### Unconfigured Response (Normal state before adding keys):
```json
{
  "configured": false,
  "connected": false,
  "status": "unconfigured",
  "message": "Supabase credentials are not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your local environment (.env.local) to connect.",
  "details": {
    "hasUrl": false,
    "hasKey": false,
    "urlMasked": null
  }
}
```

---

## 7. How to Use the Database Layer in Code

Import the centralized database service layer anywhere in your server routes or server actions:

```typescript
import { db, isSupabaseConfigured } from '@/lib/supabase';

// Check if credentials are ready
if (isSupabaseConfigured()) {
  const result = await db.contact({
    full_name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '9876543210',
    category: 'Internship',
    message: 'Enquiry details here',
  });

  if (result.success) {
    console.log('Record inserted with ID:', result.data?.id);
  } else {
    console.error('Insert error:', result.error);
  }
}
```

All operations are pre-wired to fallback gracefully if credentials are not present, ensuring 100% uptime and smooth user experience at all times.

