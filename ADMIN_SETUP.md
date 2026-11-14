# HydroSync Innovations LLP — Admin Setup & Deployment Guide

This guide walks administrators, engineers, and DevOps specialists through deploying and configuring the HydroSync Management Portal.

---

## 1. Environment Variables Configuration

Ensure the following variables are present in your production environment (e.g. Vercel Project Settings) or `.env.local` for local staging:

```bash
# Public Supabase Client (Anon Key)
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-key>"

# Privileged Server Key (Bypasses RLS for secure server verification)
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-key>"

# Optional Webhook Integrations
LEADS_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

---

## 2. Applying Database Migrations

All SQL schemas are located in `supabase/migrations/`:
- `supabase/migrations/20261113000003_create_admin_and_management_tables.sql`
- `supabase/migrations/20261113000004_create_gallery_table.sql`
- Consolidated master schema: `supabase/migrations/20261113_master_schema_and_storage.sql`

To apply via the Supabase Dashboard:
1. Navigate to your Supabase Project -> **SQL Editor**.
2. Paste the contents of `20261113_master_schema_and_storage.sql`.
3. Click **Run**. All 27 tables, RLS policies, triggers, and storage buckets will be provisioned automatically.

---

## 3. Provisioning the Initial Owner Account

Public registration is disabled. To provision the root `owner` account:
1. In Supabase Dashboard -> **Authentication** -> **Users**, click **Add user** -> **Create user**.
2. Enter the corporate email (e.g. `director@hydrosync.in`) and a high-entropy password. Check **Auto Confirm User**.
3. In SQL Editor, grant the `owner` role by inserting into `admin_users`:

```sql
INSERT INTO public.admin_users (auth_user_id, email, full_name, role, is_active)
VALUES (
    '<user-uuid-from-auth>',
    'director@hydrosync.in',
    'Executive Director',
    'owner',
    true
)
ON CONFLICT (email) DO UPDATE SET role = 'owner', is_active = true;
```

4. You can now log in at `/admin/login`. Once logged in as `owner`, you can invite and manage additional team members directly from `/admin/team-access`.

---

## 4. Storage Buckets Verification

The master SQL script creates 4 buckets:
1. `public-assets` (Public: Yes) - Brand imagery, logos, global icons.
2. `project-media` (Public: Yes) - R&D photography, oscilloscope screenshots.
3. `gallery` (Public: Yes) - Campus sessions, laboratory photos.
4. `application-attachments` (Public: No) - Private candidate resumes accessible only via signed 1-hour URLs.

