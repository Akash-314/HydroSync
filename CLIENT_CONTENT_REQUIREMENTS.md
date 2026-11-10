# CLIENT CONTENT & ASSET REQUIREMENTS SPECIFICATION

**Client Entity:** HydroSync Innovations LLP  
**Document Purpose:** Master Asset & Content Collection Checklist for Platform Version 1.0  
**Target Completion:** Prior to Phase 2 Content Freeze  

---

## 1. Corporate Identity & Legal Specifications

To satisfy commercial credibility and legal compliance across the footer, contact page, and terms of service, the following details are required from HydroSync management:

| Requirement | Description / Format | Target Location on Site | Status |
| :--- | :--- | :--- | :--- |
| **Legal Entity Name** | Full registered name (e.g., `HydroSync Innovations LLP`) | Global Header, Footer, Legal Pages | Required |
| **LLPIN / Registration No.** | Official Limited Liability Partnership Identification Number | Footer, Terms & Conditions | Required |
| **Registered Address** | Official corporate mailing address with pincode | Contact Page, Footer, Schema.org | Required |
| **Operational Lab Address** | Physical training facility / hardware R&D center address | Contact Page, About Us, Google Maps | Required |
| **Official Phone Numbers** | Landline / mobile contact numbers | Header, Contact Page, WhatsApp | Required |
| **WhatsApp Business Number** | Dedicated 10-digit number with country code (+91) | Floating Widget, Click-to-Chat hooks | Required |
| **Corporate Email Addresses** | `contact@`, `admissions@`, `careers@`, `partners@hydrosync.in` | Header, Footer, Form Handlers | Required |
| **Working Hours** | Standard business hours (e.g., Mon–Sat, 9:00 AM – 6:30 PM IST) | Contact Page, Footer | Required |

---

## 2. Branding & Visual Design Assets

To ensure high-DPI rendering and dark/light mode compatibility, assets must be provided in vector format where applicable:

| Asset | Technical Format Required | Minimum Dimensions | Usage / Notes |
| :--- | :--- | :--- | :--- |
| **Primary Logo (Dark Background)** | SVG or Transparent PNG | Vector / 1200px wide | Used in Dark Mode navbar and hero headers. |
| **Primary Logo (Light Background)** | SVG or Transparent PNG | Vector / 1200px wide | Used in Light Mode navbar and official footers. |
| **Monogram / Favicon** | SVG and 32x32px `.ico` | Vector / 512x512px | Browser tabs, mobile home screen bookmarks. |
| **Brand Color Codes** | Hex codes / Pantone | Primary, Secondary, Accents | Used to tune Tailwind design tokens. |
| **Official Social Media Links** | Verified URLs | LinkedIn, YouTube, Instagram, X, GitHub | Standardized icons in header and footer. |

---

## 3. High-Resolution Photography & Facility Media

To establish genuine authenticity and differentiate HydroSync from generic training vendors, authentic imagery of hardware, labs, and workshops must be supplied:

- **Laboratory & Hardware Facilities:**
  - High-resolution photos of electronics workbenches, oscilloscopes, function generators, soldering stations, PCB reflow equipment, and 3D printers.
  - Close-up photography of embedded boards (ESP32, STM32, Arduino, Raspberry Pi, custom HydroSync breakout PCBs).
- **Workshops & Campus Sessions:**
  - Action shots of students wiring breadboards, testing robotics chassis, and presenting projects.
  - Photos of HydroSync trainers addressing college auditoriums or conducting school STEM sessions.
- **Corporate Team & Mentors:**
  - Square headshots (minimum 600x600px, WebP/PNG, uniform neutral or laboratory background) for leadership and technical instructors.
- **Physical Gallery Collection:**
  - 15 to 30 curated photos across:
    1. *Hardware Lab Infrastructure*
    2. *Student Project Demonstrations*
    3. *Campus Hackathons & MoUs*
    4. *School STEM & ATL Activities*

---

## 4. Technical Training & Course Catalog Copy

For the **Courses (`/courses`)** and **Live Classes (`/live-classes`)** modules, structured copy is required for each program:

### Template per Course / Program:
1. **Course Title:** (e.g., *Industrial IoT Systems Architecture with ESP32 & FreeRTOS*)
2. **Category:** `IoT` | `Embedded Systems` | `Edge AI & Computer Vision` | `Robotics & ROS` | `Full-Stack Hardware Cloud`
3. **Skill Level:** `Beginner` | `Intermediate` | `Advanced`
4. **Duration & Hours:** (e.g., *6 Weeks / 48 Guided Hours*)
5. **Mode:** `Online Live Interactive` | `Classroom Hands-on` | `Hybrid Weekend`
6. **Short Summary:** 2-sentence value proposition for course card previews.
7. **Detailed Syllabus Breakdown:** Module names and bulleted topics (4 to 8 modules).
8. **Hardware Kit Details:** List of hardware components provided to students (e.g., development board, sensors, communication modules, jumper kits).
9. **Prerequisites:** Prior programming/electronics knowledge required.
10. **Target Audience:** Ideal for 2nd/3rd/4th year engineering students, hobbyists, or working professionals.

---

## 5. Internship Program Specifications

For the **Internships (`/internships`)** page and **Apply Now (`/apply`)** portal:

1. **Available Internship Tracks:**
   - *Embedded Firmware Development (C/C++, STM32, ARM Cortex-M)*
   - *IoT Architecture & Cloud Telemetry (MQTT, AWS IoT, ESP-IDF)*
   - *Edge AI, TinyML & Computer Vision (OpenCV, TensorFlow Lite)*
   - *Robotics & Autonomous Navigation (ROS2, SLAM, Motor Actuators)*
   - *Full-Stack IoT Dashboard Engineering (React, Node.js, WebSockets)*
2. **Program Durations:** Explicit options (e.g., 4 Weeks / 1 Month, 12 Weeks / 3 Months, 24 Weeks / 6 Months).
3. **Stipend Policy Disclosure:** Plain-language explanation of whether internships are unpaid skill-development tracks, performance-incentivized, or paid R&D positions.
4. **Academic Integration Support:** Details on college NOC (No Objection Certificate) approvals, guide evaluations, and final semester major/minor project credit support.

---

## 6. Institutional Collaboration Specifications

For **For Schools (`/for-schools`)** and **For Colleges (`/for-colleges`)**:

### K-12 School STEM:
- Overview of Atal Tinkering Lab (ATL) setup and maintenance services.
- Age-appropriate curriculum modules for Grades 6 through 12 (Robotics, 3D Design, Basic Electronics, Block Coding).
- Annual workshop calendar and inter-school science innovation fairs.

### Colleges & Universities:
- Institutional Memorandum of Understanding (MoU) frameworks.
- Center of Excellence (CoE) laboratory setup packages (Embedded IoT lab design).
- Faculty Development Programs (FDPs) and curriculum advisory board services.
- On-campus hackathon organization and technical symposium sponsorship models.

---

## 7. Projects & Industrial Services Showcase

For **Services (`/services`)** and **Projects (`/projects`)**:

1. **Industrial Engineering Services:**
   - Detailed write-ups on capabilities: Custom PCB Design, Firmware Architecture, Industrial Automation, Smart Sensor Nodes, Rapid Prototyping.
2. **Featured Case Studies (3 to 6 projects):**
   - *Project Title:* (e.g., *Smart Agricultural Hydroponic Telemetry System*)
   - *Category:* Industrial IoT / Embedded Systems / AI
   - *Challenge Faced:* The operational problem solved.
   - *Solution Engineered:* HydroSync's hardware and cloud architecture.
   - *Outcome / Impact:* Measurable results (e.g., 40% water reduction, real-time telemetry).
   - *Hardware & Tools Used:* (e.g., ESP32, LoRaWAN, Next.js, MQTT).

---

## 8. Social Proof & Trust Content

- **Client & Student Testimonials (6 to 12 quotes):**
  - Full Name
  - Designation / College / Branch
  - Testimonial Quote (focusing on practical skills gained, mentorship quality, or project success)
  - Profile Photo or College Logo
- **Institutional & Corporate Partners:**
  - High-resolution monochrome/color logos of partner colleges, university tie-ups, school groups, and corporate vendor partners.
- **Certifications & Accreditations:**
  - Descriptions and official badges for ISO certifications, MSME/Startup India affiliations, or IEEE/skill council memberships.

---

## 9. Legal Policies Copy

Standard draft content must be reviewed and signed off by HydroSync legal advisors:
1. **Privacy Policy:** Handling of student phone numbers, email addresses, cookies, and non-disclosure of personal data.
2. **Terms and Conditions:** Rules governing website usage, intellectual property of HydroSync course materials, and student codes of conduct.
3. **Cancellation & Refund Policy:** Clear commercial policy regarding registration fee refunds, program transfer options, and force majeure cancellations.

