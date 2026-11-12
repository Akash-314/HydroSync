# HydroSync Innovations LLP — Vercel Production Deployment Guide

This document provides the definitive, step-by-step procedure for deploying the **HydroSync Innovations LLP** digital platform to **Vercel**.

---

## 1. Architecture & Framework Overview

- **Framework:** Next.js 15.5.29 (App Router)
- **Node.js Runtime:** Node.js 18.x / 20.x / 22.x (Recommended: 20.x or 22.x LTS)
- **Package Manager:** npm
- **Rendering Strategy:** Hybrid (Static Prerendered Pages with on-demand Edge/Node.js Serverless Route Handlers)
- **Database Layer:** Supabase PostgreSQL (via official `@supabase/supabase-js` client with Row Level Security)
- **Styling:** Tailwind CSS with CSS Variables for theme switching (light/dark)

---

## 2. Pre-Deployment Verification Checklist

Before initiating deployment on Vercel, ensure:

- [x] Production build passes locally: `npm run build` generates 37/37 static and dynamic routes.
- [x] TypeScript compilation passes with zero errors: `npx tsc --noEmit`.
- [x] No sensitive files or credentials exist in Git: `.env*` files are strictly excluded by `.gitignore`.
- [x] Security headers configured in `next.config.ts`.
- [x] SEO foundation configured: `sitemap.xml`, `robots.txt`, and metadata base URL active.
- [x] Dynamic forms operate gracefully in unconfigured database states without throwing 500 errors.

---

## 3. Step-by-Step Vercel Deployment Procedure

### Option A: Deploy via GitHub / GitLab / Bitbucket (Recommended)

1. **Push Repository to Version Control:**
   Ensure your latest code from the `main` branch is pushed to GitHub:
   ```bash
   git push origin main
   ```

2. **Import Project to Vercel:**
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** > **Project**.
   - Select your repository: `HydroSync` (or your chosen repository name).

3. **Configure Project Settings:**
   Vercel automatically detects Next.js. Confirm the settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (or leave default: Next.js default)
   - **Output Directory:** `.next` (Next.js default)
   - **Install Command:** `npm install` (Next.js default)

4. **Add Environment Variables in Vercel Dashboard:**
   Under **Environment Variables**, add the following keys for **Production**, **Preview**, and **Development**:

   | Key | Value (Example) | Exposure | Required |
   | :--- | :--- | :--- | :--- |
   | `NEXT_PUBLIC_SITE_URL` | `https://hydrosync.in` (or your Vercel URL) | Public | Yes |
   | `NEXT_PUBLIC_COMPANY_NAME` | `HydroSync Innovations LLP` | Public | Yes |
   | `NEXT_PUBLIC_SUPPORT_EMAIL` | `contact@hydrosync.in` | Public | Yes |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Public | Optional (for DB) |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` (or anon key) | Public | Optional (for DB) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Alternative alias for publishable key)* | Public | Optional (for DB) |
   | `SUPABASE_SERVICE_ROLE_KEY` | *(Private service role key)* | **Secret / Server Only** | Optional |
   | `LEADS_WEBHOOK_URL` | *(Optional external CRM webhook URL)* | Server Only | Optional |

5. **Deploy:**
   Click **Deploy**. Vercel will trigger the build pipeline, run type checks, compile static routes, and deploy the application.

---

### Option B: Deploy via Vercel CLI

If deploying directly from your terminal:

1. Install Vercel CLI globally (if not installed):
   ```bash
   npm i -g vercel
   ```

2. Authenticate:
   ```bash
   vercel login
   ```

3. Deploy Preview:
   ```bash
   vercel
   ```

4. Deploy to Production:
   ```bash
   vercel --prod
   ```

---

## 4. Custom Domain Setup (DNS)

To point `hydrosync.in` (or your corporate domain) to Vercel:

1. In the Vercel Dashboard, navigate to **Settings > Domains**.
2. Enter your custom domain: `hydrosync.in` and `www.hydrosync.in`.
3. In your DNS registrar (e.g. GoDaddy, Namecheap, Cloudflare), configure:
   - **Apex domain (`hydrosync.in`):**
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **Subdomain (`www.hydrosync.in`):**
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com.`
4. Vercel will automatically provision a free SSL certificate via Let's Encrypt once DNS propagates.

---

## 5. Post-Deployment Verification

After deployment completes:

1. **Verify Live Homepage:** Visit your production URL (e.g., `https://hydrosync.in`).
2. **Verify Robots & Sitemap:**
   - `https://hydrosync.in/robots.txt`
   - `https://hydrosync.in/sitemap.xml`
3. **Verify Database Health:**
   - Visit `https://hydrosync.in/api/supabase/status`.
   - If Supabase environment variables are configured in Vercel:
     - If database tables are migrated, it will report: `status: "connected"`.
     - If tables have not been created yet in the SQL editor, it will report: `status: "error"` with migration prompt.
     - If variables are not yet entered in Vercel, it will report: `status: "unconfigured"`.
4. **Verify Form Submissions:**
   - Submit a test enquiry on `/contact`.
   - Submit a test application on `/internships`.
   - Verify that submissions succeed and do not cause errors.

---

## 6. Rollback & Troubleshooting

- **Instant Rollback:** If an issue arises after a deployment, navigate to **Deployments** in the Vercel dashboard, locate the previous stable deployment, click **...** and select **Promote to Production**.
- **Build Logs:** Full execution logs, type warnings, and route sizes can be inspected under the **Build Logs** tab for every commit.
