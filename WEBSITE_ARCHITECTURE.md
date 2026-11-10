# SYSTEM ARCHITECTURE SPECIFICATION: HydroSync Innovations LLP Corporate Platform

**Author:** Principal Software Architect & Senior Full-Stack Engineer  
**Target:** HydroSync Innovations LLP Corporate Web Platform (Version 1.0)  
**Status:** Approved Architectural Blueprint  
**Environment:** Node.js v22.16.0 | npm 10.9.2 | TypeScript 5+ | Windows Execution Host  

---

## 1. Existing Project Assessment & Baseline

An exhaustive inspection of the workspace root (`c:\Users\itsak\OneDrive\Desktop\Projects\HydroSync`) reveals the following baseline:

| Dimension | Observed State | Architectural Finding |
| :--- | :--- | :--- |
| **Directory Contents** | Single hidden directory `.git` | The project is a greenfield repository. No source files exist yet. |
| **Git Repository State** | Corrupted/partial `.git` (missing `HEAD` / `config`) | Git must be re-initialized cleanly (`git init`) prior to source control tracking. |
| **Build Configuration** | No `package.json`, `tsconfig.json`, or build manifests | Clean slate. No legacy dependencies, build lock-ins, or technical debt present. |
| **Backend & Database** | None detected | No local database engine, ORM, or backend server is running in the workspace. |
| **Existing Components / Routes** | None | Total freedom to establish a clean, scalable, enterprise-grade architecture. |
| **Host Tooling** | Node.js `v22.16.0` (LTS Current), npm `10.9.2` | Fully compatible with modern ECMAScript standards, React 19, and Next.js 15. |

### Technical Directive:
Because the repository is empty, we must build a maintainable, high-performance, TypeScript-based architecture adhering to modern web standards.

---

## 2. Technology Stack & Architectural Decision Record (ADR)

### ADR 001: Framework Selection — Next.js 15 (App Router) vs. Vite Single Page Application (SPA)

- **Context:** HydroSync requires a 25-page corporate website offering comprehensive information, course/internship catalogs, team and project showcases, and 7 customer lead-generation forms. Crucially, the platform must achieve superior search engine visibility (SEO) across educational, technical training, and IoT engineering queries.
- **Evaluation:**
  - *Option A: Client-Side Vite + React SPA:* Excellent developer experience, but renders blank HTML to crawlers by default without complex pre-rendering plugins (e.g., Vite SSG). Requires external backend services or third-party paid form APIs for processing contact submissions, leading to CORS management and external service lock-in.
  - *Option B: Next.js 15 with App Router (Static Site Generation + Serverless Route Handlers):* Delivers pre-rendered HTML (SSG/ISR) for near-instant Time to First Byte (TTFB), built-in TypeScript Metadata API for rich per-page OpenGraph and JSON-LD schema tags, automatic image optimization via `next/image`, and built-in Serverless Route Handlers (`app/api/*`) for secure form processing and webhook dispatch without maintaining an always-on database server.
- **Decision:** **Next.js 15 with App Router (React 19, TypeScript)** is selected as the core framework.
- **Consequences:** Provides native SEO capabilities, optimal Core Web Vitals, enterprise maintainability, and clean separation between static presentation and serverless form dispatch.

### Core Stack Composition:

```
+-----------------------------------------------------------------------------------+
|                                PRESENTATION LAYER                                 |
|  - Next.js 15 (App Router with Server Components & Selective Client Components)   |
|  - React 19 + TypeScript (Strict Type Safety across all schemas & props)         |
|  - Tailwind CSS v4 / v3.4 (Utility-first styling with CSS variables)             |
|  - Lucide React (Tree-shakeable, modern SVG iconography)                          |
|  - next-themes (Flicker-free Light/Dark mode state management)                    |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                           FORM & VALIDATION SUBSYSTEM                             |
|  - React Hook Form (Uncontrolled, performant form state management)               |
|  - Zod (Runtime schema validation shared between client and API route handlers)   |
|  - Sonner / Radix Toast (Accessible, non-blocking toast notifications)            |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                        API & INTEGRATION DISPATCH LAYER                           |
|  - Next.js Route Handlers (`app/api/enquiry/route.ts`, etc.)                      |
|  - Transactional Email Dispatch (Resend / Nodemailer SMTP abstraction)            |
|  - Webhook Notification Layer (Dispatches JSON payloads to CRM / Google Sheets)   |
|  - In-memory / Edge Rate Limiter (IP-based sliding window prevention)             |
+-----------------------------------------------------------------------------------+
```

---

## 3. Comprehensive Page Hierarchy & Route Architecture

All 25 required pages are mapped to explicit Next.js App Router paths:

```
src/app/
├── (legal)/
│   ├── privacy/page.tsx               # Route: /privacy (Privacy Policy)
│   ├── terms/page.tsx                 # Route: /terms (Terms and Conditions)
│   └── refund-policy/page.tsx         # Route: /refund-policy (Refund & Cancellation)
├── (marketing)/
│   ├── page.tsx                       # Route: / (Corporate Home)
│   ├── about/page.tsx                 # Route: /about (About Us, Mission, Vision)
│   ├── services/page.tsx              # Route: /services (IoT, Embedded, AI Services)
│   ├── internships/page.tsx           # Route: /internships (Internship Tracks)
│   ├── courses/page.tsx               # Route: /courses (Technical Course Catalog)
│   ├── live-classes/page.tsx          # Route: /live-classes (Masterclasses & Bootcamps)
│   ├── events/page.tsx                # Route: /events (Workshops, Hackathons, Expos)
│   ├── for-schools/page.tsx           # Route: /for-schools (K-12 STEM & ATL Labs)
│   ├── for-colleges/page.tsx          # Route: /for-colleges (MoU, FDP, CoE Partnerships)
│   ├── projects/page.tsx              # Route: /projects (Industrial & Student Showcase)
│   ├── team/page.tsx                  # Route: /team (Leadership & Instructors)
│   ├── gallery/page.tsx               # Route: /gallery (Hardware Labs & Event Photos)
│   ├── blog/page.tsx                  # Route: /blog (Technical Articles & Resources)
│   ├── contact/page.tsx               # Route: /contact (Contact & Map Directory)
│   ├── apply/page.tsx                 # Route: /apply (Universal Application Hub)
│   ├── careers/page.tsx               # Route: /careers (Open Roles & Job Application)
│   ├── certifications/page.tsx        # Route: /certifications (Credential Standards)
│   ├── partners/page.tsx              # Route: /partners (Academic & Tech Partners)
│   ├── testimonials/page.tsx          # Route: /testimonials (Alumni & Client Reviews)
│   ├── faq/page.tsx                   # Route: /faq (Comprehensive Knowledge Base)
│   └── sitemap/page.tsx               # Route: /sitemap (Human-readable HTML Sitemap)
├── not-found.tsx                      # Route: /404 (Branded 404 Fallback)
├── layout.tsx                         # Global Layout: ThemeProvider, Nav, Footer, Floating WhatsApp
├── sitemap.ts                         # Dynamic XML Sitemap (`/sitemap.xml`)
├── robots.ts                          # Crawler directives (`/robots.txt`)
└── globals.css                        # Global Design Tokens & Tailwind Base
```

---

## 4. Shared Component Architecture

To maximize maintainability and DRY principles, components are categorized into granular Atomic UI components, composite blocks, and application-specific organisms:

```
src/components/
├── ui/                                # Atomic primitives (Design System)
│   ├── button.tsx                     # Polymorphic button (variants: primary, outline, ghost, link)
│   ├── input.tsx                      # Styled text, email, tel inputs with focus ring
│   ├── textarea.tsx                   # Auto-resizable textarea
│   ├── select.tsx                     # Accessible custom dropdown
│   ├── badge.tsx                      # Domain status tags (e.g., "Trending", "Upcoming", "IoT")
│   ├── card.tsx                       # Structural card container with header, content, footer
│   ├── accordion.tsx                  # Collapsible FAQ and curriculum panels
│   ├── modal.tsx                      # Overlay dialog for quick enquiry triggers
│   └── tabs.tsx                       # Accessible tabbed switcher for domain filtering
├── layout/                            # Core structural wrappers
│   ├── navbar.tsx                     # Responsive desktop navigation + mobile drawer
│   ├── footer.tsx                     # Enterprise multi-column footer with newsletter form
│   ├── container.tsx                  # Centered responsive grid container (`max-w-7xl`)
│   └── section.tsx                    # Semantic section wrapper with uniform spacing
├── shared/                            # Reusable domain composites
│   ├── page-header.tsx                # Breadcrumb, title, subtitle & decorative gradient
│   ├── cta-banner.tsx                 # Universal lead generation banner
│   ├── stat-counter.tsx               # Corporate metrics counter (e.g., 5000+ Students, 50+ MoUs)
│   ├── google-map.tsx                 # Lazy-loaded, responsive Google Maps embed
│   ├── whatsapp-button.tsx            # Floating pulsating WhatsApp trigger + contextual chat hooks
│   ├── theme-toggle.tsx               # Sun/Moon light/dark mode switch
│   └── seo-schema.tsx                 # Injects JSON-LD structured data per page
└── forms/                             # Dedicated form implementations
    ├── contact-form.tsx               # General enquiries
    ├── internship-form.tsx            # Student applications with domain & college fields
    ├── course-enquiry-form.tsx        # Curriculum enquiries
    ├── event-registration-form.tsx    # Workshop/event seat reservations
    ├── institutional-form.tsx         # School/college partnership requests
    ├── career-application-form.tsx    # Resume link & role applications
    └── newsletter-form.tsx            # Single-field email subscription
```

---

## 5. Type System & Data Structures (TypeScript Schemas)

All static content and form submissions are governed by strict TypeScript interfaces in `src/types/index.ts`:

```typescript
// Core Data Entities
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'IoT' | 'Embedded' | 'AI' | 'Robotics' | 'FullStack';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  mode: 'Online Live' | 'Hands-on Classroom' | 'Hybrid';
  summary: string;
  curriculum: { module: string; topics: string[] }[];
  hardwareKitIncluded: boolean;
  featured: boolean;
}

export interface Internship {
  id: string;
  title: string;
  domain: 'Embedded Systems' | 'IoT Solutions' | 'Edge AI & CV' | 'Robotics' | 'Web & Cloud';
  durationOptions: ('1 Month' | '3 Months' | '6 Months')[];
  mode: 'Remote' | 'On-site Lab' | 'Hybrid';
  stipendType: 'Unpaid Training' | 'Performance-Based' | 'Paid';
  eligibility: string[];
  skillsLearned: string[];
  deliverables: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Industrial IoT' | 'Embedded Firmware' | 'Computer Vision' | 'Academic Innovation';
  clientOrScope: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  highlightMetrics?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Embedded & IoT' | 'AI & Software' | 'Academic Training';
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  institutionOrCompany: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  category: 'Student' | 'College Principal' | 'School Head' | 'Corporate Partner';
}

export interface FAQItem {
  id: string;
  category: 'Internships' | 'Courses' | 'School Programs' | 'College MoUs' | 'General';
  question: string;
  answer: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Hackathon' | 'Hands-on Workshop' | 'Webinar' | 'Industrial Expo';
  date: string;
  location: string;
  mode: 'Online' | 'Offline';
  seatsLimit?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  registrationDeadline: string;
}

// Form Submission Payloads
export interface ContactSubmission {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sourcePage?: string;
  honeypot?: string; // Anti-spam trap
}

export interface InternshipApplication {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  degreeAndBranch: string;
  graduationYear: number;
  domain: string;
  preferredDuration: string;
  mode: string;
  portfolioOrGithub?: string;
  statementOfIntent?: string;
  honeypot?: string;
}

export interface InstitutionalEnquiry {
  contactPerson: string;
  designation: string;
  institutionName: string;
  institutionType: 'K-12 School' | 'Engineering College' | 'Polytechnic Diploma' | 'University';
  email: string;
  phone: string;
  city: string;
  serviceRequested: 'STEM/ATL Setup' | 'College MoU & CoE' | 'Faculty Development' | 'Student Workshop';
  estimatedParticipants: string;
  notes?: string;
  honeypot?: string;
}
```

---

## 6. Form Handling & Lead Dispatch Strategy

### Form Processing Flow:

```
[ User Browser ]
       │
       ▼ (Client-side React Hook Form + Zod)
 1. Local validation (email format, required fields, phone regex)
 2. Honeypot check (hidden `website_url` field must remain empty)
       │
       ▼ (POST /api/leads with JSON payload)
[ Next.js Serverless Route Handler ]
       │
       ├─► 1. Rate Limiting Check (Token Bucket by IP address)
       ├─► 2. Strict Zod Schema Parsing & HTML entity sanitization
       ├─► 3. Anti-Spam Gate (Drop silently if honeypot is populated)
       │
       ├─► 4. Internal Notification: Send structured email via Resend/SMTP to `enquiry@hydrosync.in`
       ├─► 5. Webhook Dispatch: Post lead payload to external Webhook (Google Sheets, Notion, or CRM)
       └─► 6. Return JSON response `{ success: true, message: "Application received" }`
       │
       ▼
[ User Interface ]
 - Displays accessible success dialog with enquiry tracking reference
 - Recommends immediate WhatsApp chat connection for urgent questions
```

---

## 7. Asset Organization & Design System

### 7.1 Asset Hierarchy (`public/` & `src/assets/`)
```
public/
├── branding/
│   ├── hydrosync-logo-light.svg       # Dark text for light mode
│   ├── hydrosync-logo-dark.svg        # Crisp cyan/white text for dark mode
│   ├── hydrosync-mark.svg             # Monogram emblem
│   └── favicon.ico                    # Multiresolution favicon
├── images/
│   ├── hero/                          # IoT lab, PCB macro, robotics imagery (WebP)
│   ├── courses/                       # High-tech thumbnail banners
│   ├── projects/                      # Real industrial hardware prototypes
│   ├── team/                          # Standardized headshots (400x400 WebP)
│   ├── partners/                      # Monochrome vector logos
│   └── gallery/                       # Workshop, lab, and campus event snapshots
└── icons/                             # Technology badges (C++, Python, ESP32, ROS, etc.)
```

### 7.2 Design Tokens & Visual Hierarchy
To reflect HydroSync's focus on **Embedded Systems, IoT, and AI**, the palette combines deep industrial slates with precision cyan and electrical blue accents:

| Token Name | Light Theme Value | Dark Theme Value | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| `background` | `#F8FAFC` (Slate 50) | `#0B0F19` (Deep Tech Navy) | Page canvas |
| `surface` | `#FFFFFF` (Pure White) | `#131B2E` (Subtle Slate/Navy) | Card & container fill |
| `primary` | `#0284C7` (Sky 600) | `#38BDF8` (Sky 400) | Core buttons & brand accent |
| `secondary` | `#0D9488` (Teal 600) | `#2DD4BF` (Teal 400) | IoT/Hardware indicator |
| `accent` | `#6366F1` (Indigo 500) | `#818CF8` (Indigo 400) | AI & Innovation badges |
| `text-primary` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | High-contrast typography |
| `text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Body copy and subtitles |
| `border` | `#E2E8F0` (Slate 200) | `#1E293B` (Slate 800) | Grid lines and dividers |

---

## 8. Theme Architecture (Zero-Flicker Light/Dark Mode)

The theming engine uses the `next-themes` provider coupled with Tailwind's `class` dark mode strategy:
- **Default Behavior:** Respects the user's system OS preference (`prefers-color-scheme`).
- **Persistence:** Caches selection in `localStorage` under key `hydrosync-theme`.
- **SSR Safe:** Executes an inline script in `<head>` prior to paint to prevent the Flash of Unstyled Content (FOUC).
- **Smooth Transition:** Utilizes a subtle CSS transition (`transition-colors duration-200`) across background and border elements.

---

## 9. SEO & Performance Architecture

### 9.1 Metadata & Discovery Engine
Every page exports a unique, strongly typed `Metadata` object via Next.js Metadata API:
- `title`: `[Page Title] | HydroSync Innovations LLP - IoT, Embedded Systems & AI`
- `description`: Unique 150-160 character commercial summary.
- `openGraph`: Facebook/LinkedIn card with standardized 1200x630 OG image.
- `twitter`: Card format `summary_large_image`.
- `alternates`: Canonical URL declaration to prevent duplicate content indexing.

### 9.2 Structured Data (Schema.org JSON-LD)
Pages dynamically inject JSON-LD scripts:
- **Homepage (`/`):** `Organization` + `LocalBusiness` (LLP registration, logo, contact points, coordinates).
- **Courses (`/courses`):** `Course` schema (course name, educational credential, provider).
- **Events (`/events`):** `Event` schema (start date, end date, location, event attendance mode).
- **FAQ (`/faq`):** `FAQPage` schema (mainEntity list of Question/Answer pairs) for rich Google search snippets.

### 9.3 Sitemap & Crawling Directives
- **`app/sitemap.ts`:** Automatically generates an XML sitemap of all 25 static routes with `lastModified`, `changeFrequency`, and `priority` weightings.
- **`app/robots.ts`:** Allows complete indexing by all reputable crawlers while disallowing private API routes (`/api/*`).

---

## 10. External Integrations Architecture

### 10.1 WhatsApp Deep-Link Engine
- Constructs standard universal links: `https://wa.me/<PHONE>?text=<ENCODED_MESSAGE>`
- Encodes context per page:
  - Internships page: *"Hello HydroSync, I am interested in applying for your technical internship program."*
  - College page: *"Hello HydroSync, I represent an engineering college and would like to discuss an institutional MoU."*
  - Services page: *"Hello HydroSync, I have an industrial IoT / embedded prototyping requirement."*

### 10.2 Google Maps Embed
- Integrates a responsive, lazy-loaded `<iframe>` within a privacy-conscious wrapper.
- Includes clear fallback coordinates and a direct "Get Directions" button linking to Google Maps mobile app.

### 10.3 Form Dispatch Webhook / SMTP Provider
- Abstracted dispatch service allowing transparent toggling between:
  1. Transactional Email API (Resend / SendGrid / Postmark).
  2. Webhook Endpoint (Zapier, Make, n8n, or Google Apps Script sheet logger).

---

## 11. Environment Variables Specification

The deployment environment requires a standardized `.env.example` contract:

```bash
# Application Configuration
NEXT_PUBLIC_SITE_URL=https://hydrosync.in
NEXT_PUBLIC_COMPANY_NAME="HydroSync Innovations LLP"
NEXT_PUBLIC_SUPPORT_EMAIL=contact@hydrosync.in
NEXT_PUBLIC_SUPPORT_PHONE=+919876543210
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# Geolocation & Maps
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=..."

# Email Dispatcher Service (Server-side only)
EMAIL_PROVIDER=resend # Options: resend | smtp | webhook
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NOTIFICATION_RECIPIENT_EMAIL=enquiry@hydrosync.in

# Webhook Lead Delivery (Optional CRM / Sheets Integration)
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/xxxx/exec

# Security & Spam Defense
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAxxxxxxxx
```

---

## 12. Responsive Strategy & Accessibility (WCAG 2.1 AA)

- **Mobile First Breakpoints:**
  - `sm` (640px): Tablets / large phablets.
  - `md` (768px): Navigation shifts from drawer to desktop bar; two-column layouts activate.
  - `lg` (1024px): Three-column cards and complex catalog grids.
  - `xl` (1280px): Maximum constrained container width (`max-w-7xl`).
- **Touch Ergonomics:** All interactive buttons and touch targets meet a minimum hit dimension of 44x44px.
- **Accessibility:**
  - Semantic HTML5 landmark tags (`<header>`, `<main>`, `<nav>`, `<article>`, `<aside>`, `<footer>`).
  - Full keyboard tab navigation with visible outline focus rings.
  - High color contrast ratio exceeding 4.5:1 for standard text across both light and dark modes.

