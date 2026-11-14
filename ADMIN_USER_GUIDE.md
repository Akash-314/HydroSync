# HydroSync Innovations LLP — Management Portal User Guide

Welcome to the HydroSync Business Management System. This guide teaches non-technical managers and operators how to run daily operations, review candidate applications, manage course batches, and publish technical updates without editing code.

---

## 1. Accessing the Management Portal

1. Open your browser and navigate to:  
   `https://hydrosync.in/admin/login` (or `http://localhost:3000/admin/login` on local staging).
2. Enter your authorized HydroSync corporate email and password.
3. Click **Authenticate & Enter Portal**.
4. Once authenticated, your session is saved in secure HTTP cookies and you will be directed to the live Overview Dashboard (`/admin`).

---

## 2. Navigating the Portal

The navigation sidebar on the left provides instant access to all core operational departments:

- **Dashboard (`/admin`)**: Real-time snapshot of courses, applicants, inquiries, and recent activity.
- **Page Management (`/admin/pages`)**: Edit text, headlines, and call-to-actions across all 22 public pages.
- **Courses & Batches (`/admin/courses`)**: Create new technical training courses, edit syllabus modules, and schedule batches.
- **Internship Portal (`/admin/internships`)**:
  - *Programs Catalog*: Manage hardware internship cohort listings.
  - *Candidate Pipeline*: Nexonix Reflexo review pipeline with stages from New to Accepted.
  - *Form Field Config*: Customize public application questions without coding.
- **Events & Workshops (`/admin/events`)**: Publish masterclasses, bootcamps, and export attendee rosters.
- **Projects Showcase (`/admin/projects`)**: Highlight internal R&D hardware case studies and technology tags.
- **Team Directory (`/admin/team`)**: Manage executive leadership, researchers, and designations.
- **Gallery Media (`/admin/gallery`)**: Curate photo archives of laboratory equipment and campus sessions.
- **Blog & Insights (`/admin/blog`)**: Author technical whitepapers with markdown support.
- **Submissions Inbox (`/admin/submissions`)**: Centralized inbox for all contact forms, MoUs, and career inquiries.
- **Media Library (`/admin/media`)**: Upload assets to Supabase Cloud Storage and copy public CDN URLs.
- **Website Settings (`/admin/settings`)**: Company name, contact details, social links, announcement banner, and SEO.
- **Team & Roles (`/admin/team-access`)**: (Owners only) Provision manager accounts and grant permission levels.

---

## 3. Daily Management Quick Tips

- **Real-Time Public Publishing**: Any changes you save in Courses, Internships, Events, Projects, or Page CMS are instantly live on the public website via Next.js cache revalidation.
- **Reviewing Candidate Resumes**: In the Candidate Pipeline, click **Review Candidate** to view student credentials. Clicking **View Candidate Resume** generates a secure 1-hour signed link to view the PDF.
- **Exporting Data to Excel/CSV**: Look for the **Export CSV** button on the Submissions Inbox, Events, and Candidate Pipeline pages to download clean spreadsheets for offline reports.

