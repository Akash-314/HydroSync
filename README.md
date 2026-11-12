# HydroSync Innovations LLP

> Commercial web platform for **HydroSync Innovations LLP**, operating in IoT architectures, embedded systems engineering, AI hardware solutions, technical internships, and institutional STEM education.

---

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Components:** [React 19](https://react.dev/), [Lucide React](https://lucide.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Midnight Sky dark theme & CSS custom properties
- **Database & Backend:** [Supabase PostgreSQL](https://supabase.com/) with Row Level Security (RLS)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Akash-314/HydroSync.git
cd HydroSync
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase project credentials in `.env.local` (see [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## Supabase & Database Setup

The platform includes a typed database service layer for all public intake forms (contact, internships, courses, events, institutional partnerships, careers, and newsletter).

To connect your Supabase database:
1. Follow the step-by-step instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).
2. Execute the provided SQL DDL migration to create tables and configure Row Level Security (RLS).
3. Test your connection at `http://localhost:3000/api/supabase/status`.

---

## Deployment on Vercel

The platform is optimized for zero-config Vercel deployment. Refer to [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for full instructions, custom domain setup (`hydrosync.in`), and environment configuration.

---

## Documentation

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) — Database schema, migration script, and RLS policies.
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) — Vercel production deployment and custom domain guide.
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) — Full environment variable specification.

---

## License

Private repository © HydroSync Innovations LLP. All rights reserved.
