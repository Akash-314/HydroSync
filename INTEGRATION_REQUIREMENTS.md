# EXTERNAL INTEGRATION REQUIREMENTS SPECIFICATION

**Target Platform:** HydroSync Innovations LLP Corporate Website (Version 1.0)  
**Document Status:** Final Technical Specification  
**Focus:** Third-Party APIs, Lead Delivery Pipelines, Social Connectors & Security Gates  

---

## 1. WhatsApp Click-to-Chat Deep-Link Integration

### 1.1 Technical Architecture
To achieve instant, low-friction prospective client engagement, WhatsApp integration is implemented at two levels:
1. **Persistent Floating Widget:** Fixed at the bottom-right corner of all viewports with a notification pulse badge.
2. **Contextual Inline Action Buttons:** Embedded directly into Course cards, Internship detail views, and Institutional collaboration sections.

### 1.2 Deep-Link URL Contract
- **Base Endpoint:** `https://wa.me/{WHATSAPP_NUMBER}?text={ENCODED_MESSAGE}`
- **Standardized Number Format:** Strictly ISO E.164 compliant digits without spaces, hyphens, or leading plus sign (e.g., `919876543210` for an Indian mobile number).

### 1.3 Message Encoding Matrix

| Source Context | Pre-Filled Message Template (Decoded) | URL-Encoded Payload |
| :--- | :--- | :--- |
| **Global Floating Widget** | *"Hello HydroSync Team, I am visiting your website and have an enquiry about your technical programs and services."* | `Hello%20HydroSync%20Team%2C%20I%20am%20visiting%20your%20website...` |
| **Internship Page** | *"Hello HydroSync, I am interested in applying for your {Track} Internship program. Please share batch details and eligibility."* | `Hello%20HydroSync%2C%20I%20am%20interested%20in%20applying...` |
| **Course Details** | *"Hello HydroSync, I would like more information and the detailed syllabus for the {Course_Title} course."* | `Hello%20HydroSync%2C%20I%20would%20like%20more%20information...` |
| **School STEM (ATL)** | *"Hello HydroSync, I represent a school and would like to explore setting up an Atal Tinkering Lab / STEM robotics workshop."* | `Hello%20HydroSync%2C%20I%20represent%20a%20school...` |
| **College Partnerships** | *"Hello HydroSync, I represent an engineering college and would like to discuss an institutional MoU / Faculty Development Program."* | `Hello%20HydroSync%2C%20I%20represent%20an%20engineering%20college...` |
| **Industrial Services** | *"Hello HydroSync, I have an industrial IoT / embedded systems prototyping project requirement."* | `Hello%20HydroSync%2C%20I%20have%20an%20industrial%20IoT...` |

---

## 2. Google Maps Interactive Embed Integration

### 2.1 Implementation Specification
The Google Maps view is embedded on the **Contact (`/contact`)** page and optionally in an interactive modal:
- **Embed Mechanism:** Standard responsive `<iframe>` with `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"`.
- **Dimensions:** Fluid 100% width, fixed minimum height of `420px` on desktop, `280px` on mobile displays.
- **Fail-Safe / Privacy Fallback:** In the event the user restricts third-party cookies or scripts, a static visual card is displayed featuring:
  - HydroSync's physical address.
  - Nearest landmark and metro/transit instructions.
  - A direct anchor linking to the Google Maps app: `https://www.google.com/maps/dir/?api=1&destination={LATITUDE},{LONGITUDE}`.

---

## 3. Form Handling & Lead Dispatch Subsystem

Because Version 1.0 does not include a complex persistent database or administrative backend, incoming form submissions must be securely ingested, validated, and dispatched via serverless route handlers (`/api/enquiry`).

```
                    +-----------------------------+
                    |  Client Submits Form        |
                    +-----------------------------+
                                   │
                                   ▼
                    +-----------------------------+
                    |  Client Zod Validation      |
                    +-----------------------------+
                                   │
                                   ▼ POST /api/enquiry
+─────────────────────────────────────────────────────────────────────────────+
| NEXT.JS SERVERLESS ROUTE HANDLER                                            |
|                                                                             |
|  1. In-memory IP Rate Limiter (Max 5 requests per 15 mins per IP)           |
|  2. Honeypot Evaluation (If req.body.website_url !== "", drop silently)     |
|  3. Server-side Zod Schema Parsing & HTML entity escaping                   |
|                                                                             |
|            ┌───────────────────────────────┴──────────────────────────────┐ |
|            ▼                                                              ▼ |
|  [ Channel A: Transactional Email ]           [ Channel B: External Webhook ]
|  Provider: Resend / SMTP                      Target: Google Sheets / CRM    |
|  - Inbound alert to enquiry@hydrosync.in      - Appends row with timestamp  |
|  - Autoresponder to applicant                 - Guaranteed lead capture      |
+─────────────────────────────────────────────────────────────────────────────+
```

### 3.1 Primary Email Dispatch Service (Resend / SMTP)
- **Vendor Recommendation:** **Resend** (Modern developer-first email API with 3,000 free emails/month, perfect for V1.0) or custom corporate SMTP (via `nodemailer`).
- **Templates:**
  1. *Internal Corporate Alert:* Formatted HTML table highlighting applicant name, phone, email, college/institution, selected track, and message.
  2. *User Acknowledgement:* Branded autoresponder: *"Thank you for contacting HydroSync Innovations LLP. Our technical team has received your enquiry and will respond within 24 business hours."*

### 3.2 Lead Webhook Dispatch (Google Sheets / CRM Integration)
- To ensure zero lost leads without requiring an SQL database, the serverless handler automatically dispatches a POST request to an external webhook URL (`LEADS_WEBHOOK_URL`).
- **Standard Payload Schema:**
  ```json
  {
    "submissionId": "lead_1710123456789",
    "timestamp": "2026-11-10T14:30:00.000Z",
    "formType": "INTERNSHIP_APPLICATION",
    "fullName": "Student Candidate",
    "email": "candidate@example.com",
    "phone": "+919876543210",
    "details": {
      "college": "National Institute of Technology",
      "degree": "B.Tech Electronics & Communication",
      "graduationYear": 2027,
      "domainTrack": "Embedded Systems & IoT",
      "duration": "3 Months",
      "mode": "Hybrid"
    },
    "clientIp": "103.xxx.xxx.xxx"
  }
  ```
- **Fallback Implementation:** Can be connected to a simple 10-line Google Apps Script that instantly records submissions into a shared corporate Google Sheet for the sales and admissions teams.

---

## 4. Newsletter Subscription Integration

- **Placement:** Embedded in the global `Footer` and at the base of `/blog` articles.
- **Mechanism:** Minimalist single-input form (`email` address + submit icon).
- **Backend Action:** Dispatches to the `/api/newsletter` route handler. Can seamlessly route to:
  - Resend Audiences (built-in contact list).
  - Mailchimp / Brevo (Sendinblue) API via standard HTTP endpoint.
  - Dedicated Google Sheet tab labeled `Newsletter_Subscribers`.

---

## 5. Spam Protection & Security Controls

To ensure application forms are not abused by automated scrapers without annoying users with intrusive CAPTCHAs:

1. **Honeypot Technique:** Every form contains a hidden input field:
   ```html
   <input 
     type="text" 
     name="company_website_url" 
     style="display:none; position:absolute; left:-9999px;" 
     tabindex="-1" 
     autocomplete="off" 
   />
   ```
   Human users never see or fill this field; automated bots routinely fill all fields. If populated, the API returns a fake HTTP 200 success response but silently discards the lead.
2. **Server-Side Rate Limiting:** A sliding window rate limiter restricts submissions to 5 per 15 minutes per IP address.
3. **Turnstile / reCAPTCHA v3 Readiness:** The client and server code will contain modular hooks for Cloudflare Turnstile or Google reCAPTCHA v3, which can be activated by providing environment variables without refactoring form components.

---

## 6. Social Media Hub & OpenGraph Protocols

### 6.1 Social Platforms
All links are centrally managed in `src/config/site.ts`:
- **LinkedIn:** `https://www.linkedin.com/company/hydrosync-innovations`
- **YouTube:** `https://www.youtube.com/@hydrosync-innovations`
- **Instagram:** `https://www.instagram.com/hydrosync.in`
- **GitHub:** `https://github.com/hydrosync-innovations`
- **X (Twitter):** `https://x.com/hydrosync_in`

### 6.2 Social Share Previews (OpenGraph & Twitter Cards)
- Every page dynamically serves standardized OpenGraph meta properties (`og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale`).
- **Standard OG Image:** High-resolution 1200x630px card featuring HydroSync's logo, brand slogan (*"Engineering the Future of IoT, Embedded Systems & AI"*), and a modern hardware circuit graphic.

---

## 7. Web Analytics & Search Console Integration

- **Google Tag Manager (GTM) / Google Analytics 4 (GA4):**
  - Configured using `@next/third-parties/google` for optimal Core Web Vitals performance.
  - Activated conditionally when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is defined.
  - Fires custom conversion events:
    - `form_submit_contact`
    - `form_submit_internship`
    - `form_submit_course`
    - `click_whatsapp_cta`
- **Google Search Console & Bing Webmaster Tools:**
  - Automated HTML verification meta tags enabled via `.env` keys.

