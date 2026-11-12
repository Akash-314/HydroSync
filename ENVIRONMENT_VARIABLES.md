# HydroSync Innovations LLP — Environment Variables Documentation

This document catalogs all environment variables used by the HydroSync digital platform, detailing their purpose, exposure scope, required vs. optional status, and security considerations.

---

## 1. Quick Reference Matrix

| Variable Name | Scope | Default / Example Value | Required in Prod | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | `https://hydrosync.in` | **Yes** | Base domain for canonical tags, Open Graph metadata, and sitemap generation. |
| `NEXT_PUBLIC_COMPANY_NAME` | Client & Server | `HydroSync Innovations LLP` | No (defaults provided) | Official corporate entity branding string. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Client & Server | `contact@hydrosync.in` | No (defaults provided) | Public support and contact email displayed on UI and mailto links. |
| `NEXT_PUBLIC_SUPPORT_PHONE` | Client & Server | *(Optional / Pending Client)* | No | Official corporate phone number (renders conditionally when set). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| Client & Server | *(Optional / Pending Client)* | No | Official WhatsApp business phone number for chat triggers. |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | `https://xxxx.supabase.co` | Optional | Supabase PostgreSQL project API URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client & Server | `sb_publishable_...` | Optional | Client-safe publishable API key for Supabase PostgREST client. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | `eyJhbGciOi...` | Optional | Backward-compatible alias for the publishable key. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-Only** | `eyJhbGciOi...` | No | Elevated service-role key for backend administrative tasks. **NEVER expose to browser**. |
| `LEADS_WEBHOOK_URL` | **Server-Only** | `https://webhook.site/...` | No | Optional external CRM/ERP webhook URL for real-time lead dispatch. |
| `NOTIFICATION_RECIPIENT_EMAIL`| **Server-Only** | `contact@hydrosync.in` | No | Internal staff mailbox receiving transaction alerts. |

---

## 2. Detailed Variable Descriptions

### A. Core Platform & Domain

#### `NEXT_PUBLIC_SITE_URL`
- **Type:** String (Valid absolute URL with protocol)
- **Exposure:** Public (Exposed to browser via `NEXT_PUBLIC_` prefix)
- **Usage:**
  - `src/app/layout.tsx`: Used by Next.js `metadataBase` to construct absolute Open Graph images, Twitter card paths, and canonical links.
  - `src/app/sitemap.ts`: Used to generate full URLs for the 23 public routes in `/sitemap.xml`.
  - `src/app/robots.ts`: Used to reference the full sitemap location in `/robots.txt`.
- **Recommended Production Setting:** `https://hydrosync.in` (or your primary custom domain).
- **Development Setting:** `http://localhost:3000`.

#### `NEXT_PUBLIC_COMPANY_NAME`
- **Type:** String
- **Exposure:** Public
- **Usage:** Used across headers, copyright notices, and SEO tags.
- **Default:** `"HydroSync Innovations LLP"`.

#### `NEXT_PUBLIC_SUPPORT_EMAIL`
- **Type:** String (Email address format)
- **Exposure:** Public
- **Usage:** Displayed on `/contact`, `/team`, and footer directories.
- **Default:** `"contact@hydrosync.in"`.

---

### B. Supabase PostgreSQL Integration

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Type:** String (HTTPS URL)
- **Exposure:** Public
- **Usage:** Required by `@supabase/supabase-js` client to route PostgREST database queries.
- **Example:** `https://svujimucfycrbxkemxbt.supabase.co`.
- **Behavior if Unset:** The application operates in unconfigured mode. Forms function normally and database writes are bypassed safely without blocking visitors.

#### `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Type:** String
- **Exposure:** Public
- **Usage:** The public publishable API key allowing anonymous visitors to submit contact messages, internship applications, and course enquiries.
- **Security Rule:** This key is designed to be public. It only possesses the permissions explicitly granted via PostgreSQL Row Level Security (RLS) policies.
- **Behavior if Unset:** Handled gracefully by `isSupabaseConfigured()`.

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Type:** String (JWT Secret)
- **Exposure:** **STRICTLY SERVER-SIDE ONLY**
- **Usage:** Used exclusively in server-side route handlers for privileged administrative batch ingestion.
- **SECURITY WARNING:**
  - **NEVER** prefix this variable with `NEXT_PUBLIC_`.
  - **NEVER** import or reference this variable in client components (`'use client'`).
  - This key bypasses Row Level Security and must be guarded as a root credential.

---

### C. Webhooks & Lead Relays

#### `LEADS_WEBHOOK_URL`
- **Type:** String (HTTPS URL)
- **Exposure:** **Server-Side Only**
- **Usage:** When set, incoming form submissions (Internships, Courses, Events, Contact) are asynchronously forwarded to this external endpoint (e.g. Zapier, Make, Slack webhook, or internal ERP).
- **Behavior if Unset:** Webhook dispatch is skipped quietly without delaying or throwing errors to the user.

---

## 3. Environment Scope & Deployment Targets

| Environment | Where Configured | Recommended Settings |
| :--- | :--- | :--- |
| **Local Development** | `.env.local` (excluded from git) | `NEXT_PUBLIC_SITE_URL=http://localhost:3000`<br>Supabase development credentials |
| **Vercel Preview** | Vercel Project Settings > Environment Variables | `NEXT_PUBLIC_SITE_URL=https://$VERCEL_URL`<br>Staging/Dev database credentials |
| **Vercel Production** | Vercel Project Settings > Environment Variables | `NEXT_PUBLIC_SITE_URL=https://hydrosync.in`<br>Production database credentials |

---

## 4. Git Security Verification

All local environment files are ignored in `.gitignore`:
```gitignore
# local env files
.env
.env*.local
.env.development
.env.test
.env.production
.env.staging
!.env.example
```
To verify that no secrets are staged before committing:
```bash
git status
git check-ignore -v .env.local
```
Expected output:
```
.gitignore:27:.env*.local    .env.local
```

