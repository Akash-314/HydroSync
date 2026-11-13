# HydroSync Innovations LLP — Database Migrations Guide

This guide documents the version-controlled SQL migration workflow for **HydroSync Innovations LLP**.

---

## 1. Migration Directory Layout

All migrations are maintained under `supabase/migrations/` in standardized chronological order:

```text
supabase/migrations/
├── 20261113000000_create_submission_tables.sql  <-- Core form submissions (Contact, Internships, Courses, etc.)
├── 20261113000001_create_catalog_tables.sql     <-- Public catalogs (Courses, Services, Events, Projects, etc.)
├── 20261113000002_create_storage_buckets.sql    <-- Storage buckets & storage.objects RLS policies
└── 20261113_master_schema_and_storage.sql       <-- Consolidated master script for one-click SQL Editor deployment
```

---

## 2. Migration Execution Instructions

### Option A: Supabase Dashboard SQL Editor (Recommended & Fastest)
1. Open the [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project: **`svujimucfycrbxkemxbt`** (or your active project).
3. In the left navigation menu, click **SQL Editor**.
4. Click **New Query**.
5. Open `supabase/migrations/20261113_master_schema_and_storage.sql` in this project.
6. Copy the entire file contents and paste them into the SQL Editor.
7. Click the green **Run** button (or press `Ctrl + Enter` / `Cmd + Enter`).
8. Verify the success message: `Success. No rows returned`.

### Option B: Supabase CLI (Local & CI/CD Workflows)
If you have Supabase CLI linked to your project:
```bash
# Link project
npx supabase link --project-ref svujimucfycrbxkemxbt

# Apply pending migrations
npx supabase db push
```

---

## 3. Rollback & Disaster Recovery Protocol

- Each migration file includes `IF NOT EXISTS` on table and index definitions, ensuring idempotent execution.
- Policy migrations include `DROP POLICY IF EXISTS` prior to creation, preventing naming collisions during updates.
- If a complete schema reset is required in staging/development:
  ```sql
  -- DANGER: Staging / Dev only. Wipes public schema.
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  GRANT ALL ON SCHEMA public TO public;
  ```
  Then re-run `supabase/migrations/20261113_master_schema_and_storage.sql`.

---

## 4. Post-Migration Verification
After running migrations, test connectivity at:
`http://localhost:3000/api/supabase/status`
which will return:
```json
{
  "configured": true,
  "connected": true,
  "status": "connected",
  "message": "Successfully connected to HydroSync Supabase PostgreSQL database. Row Level Security and tables are verified."
}
```

