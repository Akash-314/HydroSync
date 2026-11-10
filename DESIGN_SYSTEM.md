# HYDROSYSNC INNOVATIONS LLP — DESIGN SYSTEM SPECIFICATION (VERSION 1.0)

**Document Role:** Senior UI/UX Director & Product Designer  
**Target:** HydroSync Innovations LLP Corporate Web Platform  
**Design Philosophy:** Enterprise Technology • Precision Engineering • High Legibility • Utilitarian Elegance  
**Compliance Standards:** WCAG 2.1 AA Accessibility • 8px Spatial Grid • Responsive Fluid Scale  

---

## 1. Brand Identity & Visual Positioning

**HydroSync Innovations LLP** operates at the intersection of production-grade technology development (Embedded Systems, Industrial IoT, Edge AI) and high-impact technical workforce enablement. 

### Core Design Principles:
1. **Engineered Precision over Decorative Fluff:** Visual weight is achieved through clear typographic hierarchy, balanced whitespace, and crisp border lines—never arbitrary drop-shadows, floating blobs, or gratuitous gradients.
2. **Institutional Credibility & Trust:** The platform must present equal authority to corporate enterprise clients seeking custom IoT firmware and university deans signing academic MoUs.
3. **Structured Information Architecture:** Complex technical syllabi, internship tracks, and hardware specifications must be digestible through structured data tables, clear badges, and differentiated card patterns.
4. **Accessible Performance First:** High contrast ratios, native system font rendering, zero cumulative layout shifts, and predictable interaction states across all form factors.

---

## 2. Color System & Design Tokens

The color architecture is built around calibrated corporate blues, an electrical cyan secondary, and an innovation green accent, mapped across explicit light and dark themes.

### 2.1 Color Palette Matrix

| Semantic Token | Light Mode Value | Dark Mode Value | WCAG Contrast | Primary Application |
| :--- | :--- | :--- | :--- | :--- |
| `primary` | `#0B3970` (Deep Marine) | `#51BCE8` (Electric Cyan) | 10.2:1 (Light) / 9.1:1 (Dark) | Primary CTA buttons, brand badges, active links, header logo. |
| `secondary` | `#0786C7` (Corporate Cyan) | `#24A5D5` (Vibrant Azure) | 4.8:1 (Light) / 6.2:1 (Dark) | Secondary buttons, category tags, link hovers, active borders. |
| `accent` | `#24A5D5` (Vibrant Azure) | `#51BCE8` (Dark Blue Accent) | 4.6:1 (Light) / 8.5:1 (Dark) | Micro-indicators, focus rings, status markers. |
| `innovation-green` | `#159B78` (Emerald Mint) | `#49BD99` (Dark Green Accent) | 4.7:1 (Light) / 7.8:1 (Dark) | "Open for Enrollment", "Upcoming", success toasts, verified badges. |
| `background` | `#F3F8FC` (Soft Ice Slate) | `#071522` (Deep Tech Navy) | Canvas baseline | Global page canvas, outer section wrappers. |
| `surface` | `#FFFFFF` (Pure White) | `#0F2639` (Slate Navy Surface) | Surface baseline | Card bodies, input fields, dropdown menus, modal dialogs. |
| `surface-elevated` | `#FFFFFF` (Shadowed) | `#153249` (Elevated Navy) | Visual elevation | Sticky navbar on scroll, floating WhatsApp, tooltip overlays. |
| `heading-text` | `#102E4A` (Deep Slate Ink) | `#F0F7FC` (Ice White) | 13.5:1 (Light) / 14.8:1 (Dark) | H1 through H6 headings, modal titles, card headers. |
| `body-text` | `#425B70` (Muted Steel Slate) | `#C0D2E0` (Soft Periwinkle Slate) | 6.8:1 (Light) / 8.2:1 (Dark) | Standard paragraphs, label text, form values. |
| `muted-text` | `#74899A` (Cool Neutral Gray) | `#74899A` (Balanced Ash) | 4.5:1 (Light) / 4.6:1 (Dark) | Form placeholders, timestamps, breadcrumbs, copyright text. |
| `border` | `#DCE7EF` (Subtle Grid Slate) | `#254257` (Navy Border Slate) | Structural grid | Card borders, input field borders, horizontal dividers, table grid. |

### 2.2 Functional & State Palette

| State Token | Light Mode Value | Dark Mode Value | Usage Context |
| :--- | :--- | :--- | :--- |
| `success` | `#159B78` | `#49BD99` | Form submission confirmations, active registrations. |
| `warning` | `#D97706` (Amber 600) | `#FBBF24` (Amber 400) | "Limited Seats Remaining", deadline alerts. |
| `error` | `#DC2626` (Red 600) | `#F87171` (Red 400) | Form input validation errors, rejected submissions. |
| `info` | `#0786C7` | `#51BCE8` | Informational callouts, curriculum prerequisites. |

---

## 3. Typography Hierarchy & Scale

The typographic system utilizes **Manrope** for geometric, confident headings and **Inter** for clean, highly legible body copy and tabular technical data.

```
Headings:  Manrope  (Weights: 600 SemiBold, 700 Bold, 800 ExtraBold)
Body/UI:   Inter    (Weights: 400 Regular, 500 Medium, 600 SemiBold)
Monospace: JetBrains Mono / ui-monospace (Weights: 400 Regular, 500 Medium)
```

### 3.1 Type Scale & Modular Hierarchy

| Level | Font Family | Size (px / rem) | Line Height | Tracking | Weight | Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Manrope | `48px` / `3.0rem` | `1.15` (`55px`) | `-0.025em` | 800 (ExtraBold) | Primary Homepage Hero statement only. |
| **Page H1** | Manrope | `36px` / `2.25rem` | `1.20` (`44px`) | `-0.02em` | 700 (Bold) | Inner page title headers (About, Internships, etc.). |
| **Section H2** | Manrope | `28px` / `1.75rem` | `1.25` (`36px`) | `-0.015em` | 700 (Bold) | Major section titles, featured program groups. |
| **Card H3** | Manrope | `20px` / `1.25rem` | `1.30` (`26px`) | `-0.01em` | 600 (SemiBold) | Program titles, project names, service headings. |
| **Sub-item H4** | Manrope | `16px` / `1.0rem` | `1.35` (`22px`) | `0.0em` | 600 (SemiBold) | Curriculum modules, team roles, FAQ questions. |
| **Lead Paragraph** | Inter | `18px` / `1.125rem` | `1.60` (`29px`) | `-0.005em` | 400 (Regular) | Intro text beneath page titles and hero statements. |
| **Body Standard** | Inter | `15px` / `0.9375rem` | `1.60` (`24px`) | `0.0em` | 400 / 500 | Main paragraph text, card descriptions, syllabus. |
| **Small / UI Text** | Inter | `13px` / `0.8125rem` | `1.45` (`19px`) | `0.01em` | 500 (Medium) | Navigation links, badge text, button labels, metadata. |
| **Micro Caption** | Inter | `12px` / `0.75rem` | `1.40` (`17px`) | `0.02em` | 500 (Medium) | Form error text, image captions, footer legal copyright. |
| **Code / Hardware** | JetBrains Mono | `13px` / `0.8125rem` | `1.50` (`20px`) | `0.0em` | 500 (Medium) | Hardware kit specs, firmware pinouts, tech tags. |

### 3.2 Visual Restrictions for Typography:
- ❌ **No Oversized Display Text:** Heading sizes are strictly capped at `48px` on desktop and `32px` on mobile. No giant `80px` typography that pushes content below the fold.
- ❌ **No All-Caps Paragraphs:** Uppercase styling is restricted solely to small badges and category tags (`11px` uppercase with `0.05em` tracking).

---

## 4. Spacing, Sizing & 8px Spatial Grid

Every layout dimension, padding value, margin increment, and component height adheres strictly to an **8px base increment** (`n * 8px`). A 4px sub-increment is permitted exclusively for tight UI borders, badge padding, and icon gap alignment.

### 4.1 Spacing Token Scale

| Token | Dimension | Tailwind Equivalent | Usage Scope |
| :--- | :--- | :--- | :--- |
| `space-1` | `4px` | `0.5` / `1` | Micro gap between icon and button label; tight badge padding. |
| `space-2` | `8px` | `2` | Stack gap in lists, horizontal padding inside compact inputs. |
| `space-3` | `12px` | `3` | Intermediate padding inside table cells and compact badges. |
| `space-4` | `16px` | `4` | Card inner padding (mobile), standard form field vertical gap. |
| `space-6` | `24px` | `6` | Standard card inner padding (desktop), grid column gap. |
| `space-8` | `32px` | `8` | Spacing between section header and card grid; dialog padding. |
| `space-12` | `48px` | `12` | Inner section padding for secondary content bands. |
| `space-16` | `64px` | `16` | Standard section top/bottom padding on mobile. |
| `space-20` | `80px` | `20` | Standard section top/bottom padding on tablet and laptop. |
| `space-24` | `96px` | `24` | Major hero banner top/bottom padding on desktop. |

---

## 5. Layout Grid & Structural Archetypes

### 5.1 Container Standards
- **Maximum Width:** Strictly bound to **`1240px`** (`max-w-[1240px]`), centered with `mx-auto`.
- **Horizontal Viewport Padding:**
  - Mobile (`< 640px`): `16px` (`px-4`)
  - Tablet (`640px – 1023px`): `24px` (`px-6`)
  - Desktop (`≥ 1024px`): `32px` (`px-8`)

### 5.2 Responsive Breakpoints

| Breakpoint | Minimum Width | Layout Configuration |
| :--- | :--- | :--- |
| **Mobile (`xs`/`sm`)** | `320px` to `639px` | 1-column layouts, stacked cards, full-width inputs, mobile drawer menu. |
| **Tablet (`md`)** | `640px` to `1023px` | 2-column grids, compact horizontal stats, condensed tables. |
| **Laptop (`lg`)** | `1024px` to `1279px` | 3-column card grids, desktop navigation bar with dropdowns, sidebar layouts. |
| **Desktop (`xl`)** | `1280px` and above | Full 12-column grid system, maximum constrained container (`1240px`). |

### 5.3 Reusable Section Archetype
Every content section adheres to an identical structural layout pattern:

```
+─────────────────────────────────────────────────────────────────────────────+
| [Section Wrapper: py-16 md:py-20 bg-background OR bg-surface]               |
|   +───────────────────────────────────────────────────────────────────────+ |
|   | [Container: max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8]               | |
|   |                                                                       | |
|   |   [Section Header Block: max-w-2xl mb-10 md:mb-12]                    | |
|   |   • Eyebrow Tag: [text-xs font-semibold text-secondary uppercase]     | |
|   |   • Title H2:    [text-2xl md:text-3xl font-bold text-heading mt-2]   | |
|   |   • Subtitle:    [text-base text-body mt-3 leading-relaxed]           | |
|   |                                                                       | |
|   |   [Section Content Area: 12-Column Responsive Grid]                   | |
|   |   • 3-Column Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6| |
|   |   • OR 2-Column Split: grid grid-cols-1 lg:grid-cols-12 gap-10        | |
|   |                                                                       | |
|   |   [Optional Section Footer: text-center mt-10 md:mt-12]               | |
|   |   • View All CTA Button / Contextual Link                             | |
|   +───────────────────────────────────────────────────────────────────────+ |
+─────────────────────────────────────────────────────────────────────────────+
```

---

## 6. Atomic Component Specifications

### 6.1 Buttons (Height & State System)

All buttons enforce rigid heights, crisp `6px` border radii (`rounded-md`), and high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`).

| Variant | Light Styling | Dark Styling | Height & Padding | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary CTA** | Background `#0B3970`, Text `#FFFFFF`, Hover `#0786C7` | Background `#51BCE8`, Text `#071522`, Hover `#24A5D5` | `h-11` (44px), `px-6`, `text-sm font-semibold` | Primary action (Apply Now, Submit, Register). |
| **Secondary Button** | Background `#FFFFFF`, Border `#DCE7EF`, Text `#0B3970`, Hover `bg-[#F3F8FC]` | Background `#0F2639`, Border `#254257`, Text `#F0F7FC`, Hover `bg-[#153249]` | `h-11` (44px), `px-5`, `text-sm font-semibold` | Secondary actions (Explore Syllabus, View Details). |
| **Outline Innovation** | Border `#159B78`, Text `#159B78`, Hover `bg-[#159B78]/10` | Border `#49BD99`, Text `#49BD99`, Hover `bg-[#49BD99]/10` | `h-11` (44px), `px-5`, `text-sm font-semibold` | Domain highlights (Download Curriculum, Lab Tour). |
| **Ghost / Text Button** | Background `transparent`, Text `#0786C7`, Hover `bg-[#DCE7EF]/50` | Background `transparent`, Text `#51BCE8`, Hover `bg-[#254257]/50` | `h-9` (36px), `px-3`, `text-sm font-medium` | In-card text links ("Read more →", "View project"). |
| **Compact / Filter** | Background `#FFFFFF`, Border `#DCE7EF`, Text `#425B70`, Active `bg-[#0B3970] text-white` | Background `#0F2639`, Border `#254257`, Text `#C0D2E0`, Active `bg-[#51BCE8] text-[#071522]` | `h-9` (36px), `px-4`, `text-xs font-medium` | Category filter pills (IoT, AI, Embedded). |

### 6.2 Form Inputs & Controls

- **Standard Field Height:** Uniform `44px` (`h-11`) across text inputs, selects, and phone fields.
- **Textarea:** Standard minimum height `120px` with vertical-only resize.
- **Input Typography:** `text-sm` (`14px`) with `placeholder:text-muted`.
- **States:**
  - *Default:* Border `border-border`, Surface `bg-surface`.
  - *Focus:* Border `border-secondary`, `ring-2 ring-secondary/20` outline.
  - *Error:* Border `border-error`, `ring-2 ring-error/20` outline, helper text in `#DC2626` / `#F87171`.

### 6.3 Badges & Category Tags
- Compact `24px` height (`h-6`), `px-2.5`, `rounded-full`, `text-[11px] font-semibold uppercase tracking-wider`.
- **IoT / Hardware:** Blue tone (`bg-[#0786C7]/10 text-[#0786C7] dark:bg-[#51BCE8]/15 dark:text-[#51BCE8]`).
- **AI / Computing:** Violet tone (`bg-[#24A5D5]/10 text-[#24A5D5] dark:bg-[#24A5D5]/15 dark:text-[#24A5D5]`).
- **Live / Active:** Green tone (`bg-[#159B78]/10 text-[#159B78] dark:bg-[#49BD99]/15 dark:text-[#49BD99]`).

---

## 7. Differentiated Card Architecture

To prevent visual monotony, card designs are tailored specifically to the type of information being conveyed.

### 7.1 Architecture Archetypes

```
[ ARCHETYPE A: Program / Course Card ]
┌──────────────────────────────────────────────┐
│ [Hardware/Topic Thumbnail: 16:9 Aspect Ratio]│
│ Badge: [IOT & EMBEDDED]     Duration: 6 Wks  │
├──────────────────────────────────────────────┤
│ H3: Industrial IoT with ESP32 & FreeRTOS     │
│ Body: Master industrial edge telemetry, MQTT │
│ protocols and hardware sensor integration.   │
├──────────────────────────────────────────────┤
│ Hardware Kit: [✓ Included ESP32 Starter Kit] │
│ Mode: Hands-on Hybrid     Level: Intermediate│
├──────────────────────────────────────────────┤
│ [ Button: View Syllabus ]  [ Button: Apply ] │
└──────────────────────────────────────────────┘

[ ARCHETYPE B: Project / Case Study Card ]
┌──────────────────────────────────────────────┐
│ [High-Contrast Tech Visual: 16:10 Aspect]    │
├──────────────────────────────────────────────┤
│ Client Scope: Agricultural Automation        │
│ H3: Smart Telemetry Irrigation Gateway       │
│ Tech Badges: [ESP32] [LoRaWAN] [Next.js]     │
│ Key Metric: "40% Water Reduction Verified"   │
├──────────────────────────────────────────────┤
│ Link: View Case Study Architecture →         │
└──────────────────────────────────────────────┘

[ ARCHETYPE C: Event Schedule Card (Horizontal Row) ]
┌────────┬─────────────────────────────────────┬──────────────┐
│ 24 NOV │ H3: Hands-on STM32 Firmware Master  │ Seats: 12/40 │
│  2026  │ Location: Hardware Lab 2 / Online   │ [Register]   │
└────────┴─────────────────────────────────────┴──────────────┘
```

### 7.2 Card Alignment & Dimensions:
- Cards within any single grid enforce **uniform height** via CSS Flexbox column layout (`flex flex-col h-full justify-between`).
- All card borders adhere to `border border-border` with a subtle radius of `rounded-lg` (8px).
- **No excessive elevation:** Zero deep shadows. On hover, cards transition their border color (`hover:border-secondary`) with a restrained 2px vertical translation (`hover:-translate-y-0.5 transition-all duration-150`).

---

## 8. Global Navigation Architecture

### 8.1 Header Specifications
- **Height:** Fixed `72px` (`h-[72px]`) on desktop, `64px` (`h-16`) on mobile.
- **Positioning:** Sticky (`sticky top-0 z-50`) with backdrop blur (`backdrop-blur-md bg-surface/90 border-b border-border`).
- **Logo Area:**
  - Left-aligned: HydroSync monogram emblem + text mark (`HydroSync Innovations LLP`).
  - Max dimensions: Height `36px`, Width auto.
- **Navigation Links Structure (Center):**
  1. **Home** (`/`)
  2. **Services** (`/services`)
  3. **Internships** (`/internships`)
  4. **Courses** (`/courses`)
  5. **Institutions [Dropdown Trigger]:**
     - *For Schools* (STEM, Robotics Labs, ATL)
     - *For Colleges* (MoUs, CoE, Faculty Development)
  6. **Resources [Dropdown Trigger]:**
     - *Live Classes*
     - *Events & Workshops*
     - *Projects Showcase*
     - *Technical Blog*
     - *Certifications*
     - *FAQ*
  7. **About** (`/about`)
  8. **Contact** (`/contact`)
- **Right Utilities:**
  - `ThemeToggle` switch (Sun/Moon icon button, `h-10 w-10`).
  - `Apply Now` CTA Button (High-visibility Primary button, `h-10 px-5 text-sm`).

### 8.2 Dropdown Menu Behavior:
- Opens cleanly on hover (with a 150ms exit delay) or on tap/click.
- Styled as an elevated surface (`bg-surface border border-border shadow-lg rounded-lg p-3 min-w-[240px]`).
- Includes clear icons and one-line descriptions for each sub-link.

### 8.3 Mobile Navigation Drawer:
- Triggered by a clean hamburger button (`h-10 w-10`).
- Slides in smoothly from the right side (`w-full sm:w-[360px] bg-surface h-full shadow-2xl p-6`).
- Accordion-style expandable sections for *Institutions* and *Resources*.
- Prominent "Apply Now" button fixed at the base of the drawer.

---

## 9. Concise Homepage Layout Blueprint

To avoid duplicating inner page catalogs while maintaining high commercial conversion, the homepage follows a structured, purposeful sequence:

```
[ 1. STICKY HEADER & NAVIGATION ]
  ├── Logo | Nav Links | Dropdowns | Theme Toggle | "Apply Now" CTA

[ 2. HERO SECTION ]
  ├── Left Column (60%):
  │   ├── Focus Tag: [ENGINEERING • IOT • EMBEDDED • AI]
  │   ├── H1: "Engineering Tomorrow's Connected Systems & Technical Talent"
  │   ├── Lead: Industrial IoT solutions, custom embedded architectures, and 
  │   │   hands-on technical internships bridging academia to commercial innovation.
  │   └── Dual CTAs: [Explore Programs (Primary)]  [Enterprise Services (Secondary)]
  └── Right Column (40%):
      └── Crisp Hardware Architecture Diagram / Authentic Lab Showcase Graphic

[ 3. KEY FOCUS VERTICALS ] (4-Column Clean Metric Grid)
  ├── 01 / Embedded Systems (Firmware, PCB, ARM)
  ├── 02 / Internet of Things (Cloud Telemetry, Edge Gateways)
  ├── 03 / Artificial Intelligence (Edge AI, Computer Vision)
  └── 04 / Technical Enablement (Internships, School STEM, College CoEs)

[ 4. CORE SERVICES & FLAGSHIP PROGRAMS ] (Tabbed Switcher)
  ├── Tab 1: Industry Services (IoT Hardware & Prototyping)
  ├── Tab 2: Flagship Internships (Embedded & Edge AI Tracks)
  └── Tab 3: Institutional Labs (School ATL & College MoUs)
  └── [Max 3 Featured Cards per tab + "View Full Catalog →" link]

[ 5. FEATURED INDUSTRIAL PROJECTS ] (3-Column Showcase)
  └── 3 Concrete Case Studies (Title, Hardware Stack, Measurable Impact)

[ 6. UPCOMING MASTERCLASSES & EVENTS ] (Structured Schedule List)
  └── 2 Upcoming Workshops with Date, Venue/Online, and Registration Trigger

[ 7. SOCIAL PROOF / TESTIMONIALS ]
  └── Controlled Testimonial Carousel OR Controlled Empty State
      (If < 3 verified quotes available: Display "Our Institutional Impact" stats banner)

[ 8. ACADEMIC & CORPORATE PARTNERS ]
  └── Controlled Partner Grid (Verified university & tech vendor logos only;
      clean textual collaboration banner if logos pending client sign-off)

[ 9. FINAL INBOUND ENQUIRY BANNER ]
  └── High-contrast CTA band: "Ready to Innovate or Upskill?" 
      with Dual Actions: [Submit Enquiry] & [Chat on WhatsApp]

[ 10. MULTI-COLUMN CORPORATE FOOTER ]
```

---

## 10. Inner Page Layout Archetypes

All 18 inner pages adhere to one of four standardized layout archetypes:

### 10.1 Archetype I: Catalog & Directory Layout
*Applied to: Internships, Courses, Projects, Events, Blog, Careers, Gallery.*
- **Top:** Standardized Page Header (Title, Subtitle, Breadcrumb, Active Count).
- **Control Bar:** Horizontal category filter pills (`All`, `Embedded`, `IoT`, `AI`, `Robotics`) + Search input.
- **Body:** 3-Column responsive card grid (`gap-6`).
- **Bottom:** Lead capture CTA banner.

### 10.2 Archetype II: Institutional Partnership Layout
*Applied to: For Schools, For Colleges, Services.*
- **Top:** Split hero with institutional focus (e.g., "Atal Tinkering Lab Setup & Mentorship").
- **Middle Section 1:** Deliverables breakdown (Infrastructure, Curriculum, Teacher Training).
- **Middle Section 2:** Step-by-step engagement workflow (Assessment → Lab Setup → Ongoing Mentorship).
- **Bottom:** Dedicated Institutional Collaboration Form embedded directly into the page.

### 10.3 Archetype III: Trust, People & Credentials Layout
*Applied to: About Us, Team, Certifications, Partners, Testimonials, FAQ.*
- **About Us / Team:** Executive statement, leadership profile grid with technical bios, facility photos.
- **Certifications:** Credential verification standards, syllabus rigor benchmarks, sample certificate preview.
- **FAQ:** Split layout with sticky category sidebar on the left (`Internships`, `Courses`, `Institutional`) and searchable accordion panels on the right.

### 10.4 Archetype IV: Direct Action & Compliance Layout
*Applied to: Contact, Apply Now, Privacy Policy, Terms, Refund Policy.*
- **Contact:** Split 50/50 layout: Left column contains contact details, business hours, and Google Maps embed; Right column contains the validated Contact Form.
- **Apply Now:** Multi-step tabbed intake form (Select Track → Academic Info → Submission).
- **Legal Pages:** Focused reading container (`max-w-3xl mx-auto`), clear section numbering, and revision date.

---

## 11. Controlled Empty States & Fallback Patterns

To prevent the website from looking unfinished or utilizing fake placeholder data:

| Section | Trigger Condition | Controlled UI Fallback State |
| :--- | :--- | :--- |
| **Partner Logos** | Verified SVG logos pending client approval | Replace logo grid with an **Institutional MoUs & Reach** card highlighting active university affiliations, school STEM outreach numbers, and an "Invite HydroSync to Your Campus" link. |
| **Testimonials** | Fewer than 3 verified quotes provided | Display an **Alumni Outcome Metrics** block: Percentage of project completion, hardware kit satisfaction ratings, and corporate mentor feedback summary. |
| **Events** | No live events scheduled for current month | Display: *"No public hackathons currently scheduled for this month. Explore our self-paced courses or subscribe to our newsletter for upcoming announcements."* |
| **Hardware Gallery** | High-res lab photos pending photoshoot | Render curated hardware breakdown schematics and authentic PCB vector illustrations in place of generic stock imagery. |

---

## 12. Authentic Imagery & Media Art Direction

### 12.1 Strict Imagery Guidelines:
- ✅ **Permitted Media:**
  - Real photography of electronics hardware: microcontrollers (ESP32, STM32), oscilloscopes, custom PCBs, logic analyzers, sensors, soldering stations.
  - Authentic photos of engineering students collaborating in labs or presenting hardware prototypes.
  - High-precision vector pinout diagrams and architecture flowcharts.
- ❌ **Strictly Prohibited:**
  - Generic stock photos of models pretending to look at glowing holographic interfaces.
  - Cheesy robotic handshakes or generic business handshakes.
  - Invented AI-generated headshots of fake team members.

### 12.2 Media Aspect Ratios & Processing:
- **Card Thumbnails:** Uniform `16:9` aspect ratio, rendered using `next/image` with `object-fit: cover`.
- **Project Showcase:** `16:10` aspect ratio.
- **Team Headshots:** Uniform `1:1` square aspect ratio (`rounded-full` or `rounded-lg`).

---

## 13. Motion, Interaction & Accessibility Rules

### 13.1 Micro-Interaction Principles:
- **Duration:** All UI transitions are constrained between `150ms` and `200ms` (`duration-150` or `duration-200`).
- **Easing:** Native `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out).
- **Interactive Triggers:**
  - Buttons: Subtle brightness shift (`hover:opacity-95 active:scale-[0.99]`).
  - Cards: `2px` upward translation (`hover:-translate-y-0.5`) with border highlight.
  - Zero auto-playing video carousels or jarring layout shifts.

### 13.2 Accessibility (WCAG 2.1 AA Compliance):
- **Focus Rings:** Visible `2px` focus outline with offset (`focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2`).
- **Keyboard Navigation:** Dropdown menus, accordions, and dialog modals fully navigable via `Tab`, `Space`, `Enter`, and `Escape`.
- **Contrast Ratios:** All text elements exceed the required 4.5:1 ratio against their background in both light and dark modes.

---

## 14. Complete Tailwind CSS Configuration Specification

The following configuration contract maps all tokens directly into the development environment:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light & Shared Brand Tokens
        primary: {
          DEFAULT: '#0B3970',
          hover: '#0786C7',
          light: '#F3F8FC',
        },
        secondary: {
          DEFAULT: '#0786C7',
          hover: '#24A5D5',
        },
        accent: {
          DEFAULT: '#24A5D5',
        },
        innovation: {
          DEFAULT: '#159B78',
          dark: '#49BD99',
        },
        // Theme Surfaces & Text
        theme: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          elevated: 'var(--color-elevated)',
          heading: 'var(--color-heading)',
          body: 'var(--color-body)',
          muted: 'var(--color-muted)',
          border: 'var(--color-border)',
        },
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      maxWidth: {
        container: '1240px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
```

