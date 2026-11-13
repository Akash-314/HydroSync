# HydroSync Innovations LLP — Supabase PostgreSQL & Storage Integration Guide

This document provides the complete, production-grade guide to connecting your actual **Supabase PostgreSQL** database and **Supabase Storage** to the HydroSync Innovations LLP corporate platform.

---

## 1. Architecture Overview

The application architecture is fully prepared and connected for Supabase PostgreSQL and Storage:

- **Centralized Client:**
  - Browser Client (`src/lib/supabase/client.ts`): Reusable client for client components with automatic session management.
  - Server Client (`src/lib/supabase/server.ts`): Server-side client for Route Handlers and Server Components. Never exposes service-role keys.
  - Complete Schema Types (`src/lib/supabase/types.ts`): Full TypeScript types for all 17 tables.
- **Reusable Database Service Layer (`src/lib/supabase/services/`):**
  - Form submissions: `contact`, `internships`, `courses`, `events`, `institutional`, `careers`, `newsletter`.
  - Dynamic public catalogs: `getCourses`, `getInternshipPrograms`, `getServices`, `getEvents`, `getProjects`, `getTeam`, `getFaqs`, `getTestimonials`, `getPartners`.
- **Supabase Storage Service (`src/lib/supabase/storage.ts`):**
  - Private applicant attachment uploads (`application-attachments`) with signed URLs.
  - Public asset delivery (`public-assets`, `project-media`, `gallery`).
- **Graceful Unconfigured Fallback:**
  - If Supabase environment variables are missing or tables pending, all site features and forms function normally without crashing or freezing the UI.
- **Connection Diagnostics:**
  - Live status endpoint: `GET /api/supabase/status` reports real-time connectivity, latency, and schema status.

---

## 2. Quick Setup Checklist

1. [x] Supabase project created (`https://svujimucfycrbxkemxbt.supabase.co`).
2. [x] Credentials configured in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. [ ] Run the Master SQL Migration script in **Supabase Dashboard > SQL Editor**:
   - File: `supabase/migrations/20261113_master_schema_and_storage.sql`
4. [ ] Verify connection at `http://localhost:3000/api/supabase/status`.
5. [ ] Perform a test submission on any public form (e.g., `/contact`, `/apply`).

---

## 3. Step-by-Step Connection Instructions

### Step 1: Environment Variables
Ensure `.env.local` exists in your project root with your verified credentials:

```ini
# Supabase PostgreSQL Configuration
NEXT_PUBLIC_SUPABASE_URL=https://svujimucfycrbxkemxbt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xElQCwsBqAr9MGwwWyLqBg_9fB91cOB

# Optional Server-Side Only Admin Key (NEVER prefix with NEXT_PUBLIC_)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 2: Apply Database Schema & Storage
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard/project/svujimucfycrbxkemxbt).
2. Click **SQL Editor** in the left sidebar.
3. Click **New Query**.
4. Open the file `supabase/migrations/20261113_master_schema_and_storage.sql` from your local project.
5. Paste the complete SQL code and click **Run**.
6. The database will provision:
   - 7 Submission Tables (`contact_enquiries`, `internship_applications`, etc.)
   - 10 Dynamic Catalog Tables (`courses`, `internship_programs`, `services`, etc.)
   - 4 Storage Buckets (`application-attachments`, `public-assets`, `project-media`, `gallery`)
   - Complete Row Level Security (RLS) policies for every table and bucket.

### Step 3: Verify Real-Time Status
Visit `http://localhost:3000/api/supabase/status` in your browser or run:
```bash
curl http://localhost:3000/api/supabase/status
```
When migrations are applied, the endpoint returns:
```json
{
  "configured": true,
  "connected": true,
  "status": "connected",
  "message": "Successfully connected to HydroSync Supabase PostgreSQL database. Row Level Security and tables are verified."
}
```

---

## 4. Key Reference Files

- Database Schema Guide: [`SUPABASE_DATABASE_SCHEMA.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/SUPABASE_DATABASE_SCHEMA.md)
- Storage Setup Guide: [`SUPABASE_STORAGE_SETUP.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/SUPABASE_STORAGE_SETUP.md)
- RLS Policies Reference: [`SUPABASE_RLS_POLICIES.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/SUPABASE_RLS_POLICIES.md)
- Migrations Documentation: [`SUPABASE_MIGRATIONS.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/SUPABASE_MIGRATIONS.md)
- Database Feature Mapping: [`DATABASE_FEATURE_MAPPING.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/DATABASE_FEATURE_MAPPING.md)
- Integration Test Report: [`DATABASE_TEST_REPORT.md`](file:///c:/Users/itsak/OneDrive/Desktop/Projects/HydroSync/DATABASE_TEST_REPORT.md)
