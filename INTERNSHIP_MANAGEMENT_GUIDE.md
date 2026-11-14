# HydroSync Innovations LLP — Advanced Internship Management Guide

This guide details the **Nexonix Reflexo Candidate Management Pipeline** implemented for HydroSync's industrial internship cohorts.

---

## 1. Candidate Application Pipeline

Navigate to `/admin/internships/applications` to view the five-stage pipeline:

```
[ New Applications ] ➔ [ Under Review ] ➔ [ Shortlisted ] ➔ [ Selected ] ➔ [ Rejected ]
```

### Candidate Review Modal
Click **Review** on any candidate row to open the full evaluation modal:
1. **Student Dossier**: Inspect full name, email, phone number, college, branch, year of study, and application ID.
2. **Secure Resume Access**: Click **Open Resume in New Window** to fetch a temporary signed URL valid for 60 minutes.
3. **Stage Transitions**:
   - Change candidate stage (e.g. from `Under Review` to `Shortlisted`).
   - Every status transition is automatically recorded in `application_status_history` with timestamp and reviewing manager.
4. **Internal Reviewer Notes**: Add confidential evaluation notes (e.g. *"Strong bare-metal C knowledge, performed well in STM32 interview"*). Notes are saved persistently in database metadata.
5. **CSV Export**: Click **Export Stage CSV** to download all candidate records in the active stage.

---

## 2. Dynamic Form Field Configuration

Navigate to `/admin/internships/fields` to customize the questions asked on the public application form without editing code:
- Toggle fields as Enabled or Disabled.
- Set fields as Required or Optional.
- Create new text, email, select, or file upload fields.
- Reorder fields using drag-and-drop or priority indices.
