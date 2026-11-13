# HydroSync Innovations LLP — Supabase Storage Architecture & Setup

This guide defines the storage architecture, bucket policies, security controls, and programmatic upload protocols for **HydroSync Innovations LLP** on Supabase Storage.

---

## 1. Bucket Specifications & Access Matrix

| Bucket Name | Access Level | Max File Size | Allowed MIME Types | Intended Use Case |
|---|---|---|---|---|
| `application-attachments` | **Private** | 10 MB (10,485,760 B) | `application/pdf`, `.doc`, `.docx`, `.zip` | Student/candidate resumes, project portfolios, academic transcripts. |
| `public-assets` | **Public** | 20 MB (20,971,520 B) | Images (`png`, `jpeg`, `webp`, `svg`), `pdf` | Course syllabi, institutional MoU brochures, corporate whitepapers. |
| `project-media` | **Public** | 25 MB (26,214,400 B) | Images (`png`, `jpeg`, `webp`, `svg`), `pdf` | Hardware schematics, PCB layout images, test-bench diagrams, telemetry screenshots. |
| `gallery` | **Public** | 25 MB (26,214,400 B) | Images (`png`, `jpeg`, `webp`) | High-resolution photography from workshops, hackathons, lab training, and university events. |

---

## 2. Security & Access Control Policies

### 2.1 Private Bucket: `application-attachments`
- **Public Access:** Disabled (`public = false`). Direct public URLs return HTTP 403 Forbidden.
- **Upload Access (INSERT):** Permitted for anonymous and authenticated users with strict file extension filtering:
  ```sql
  CREATE POLICY "allow_applicant_upload_attachments"
      ON storage.objects
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
          bucket_id = 'application-attachments' AND
          (storage.extension(name) IN ('pdf', 'doc', 'docx', 'zip'))
      );
  ```
- **Read Access (SELECT):** Restricted exclusively to authenticated administrators.
- **Client Access Pattern:** Candidates receive a secure token; administrators generate time-limited signed URLs (default 60 minutes) to review applications without exposing the underlying files to the public internet.

### 2.2 Public Buckets: `public-assets`, `project-media`, `gallery`
- **Public Access:** Enabled (`public = true`). Assets are served directly via Supabase's global CDN.
- **Read Access (SELECT):** Unrestricted public read:
  ```sql
  CREATE POLICY "public_read_public_buckets"
      ON storage.objects
      FOR SELECT
      TO anon, authenticated
      USING (bucket_id IN ('public-assets', 'project-media', 'gallery'));
  ```
- **Write/Delete Access:** Restricted strictly to authenticated administrators with `service_role` credentials.

---

## 3. Programmatic Usage in Codebase

### 3.1 Uploading an Applicant Resume
```typescript
import { uploadApplicantAttachment } from '@/lib/supabase/storage';

// From a client form or Route Handler:
const result = await uploadApplicantAttachment(
  file,
  'candidate_resume.pdf',
  'internship' // or 'career'
);

if (result.success) {
  console.log('Saved storage path:', result.path);
  // Persist result.path into internship_applications.resume_url
}
```

### 3.2 Generating a Secure Signed URL for Authorized Review
```typescript
import { getAttachmentSignedUrl } from '@/lib/supabase/storage';

const { url, error } = await getAttachmentSignedUrl(
  'internship/2026-11-13/179455_candidate_resume.pdf',
  3600 // 60 minutes
);

if (url) {
  // Safe to render in secure admin interface
}
```

### 3.3 Resolving Public Media URLs
```typescript
import { getPublicMediaUrl } from '@/lib/supabase/storage';

const imageUrl = getPublicMediaUrl(
  'project-media',
  'schematics/iot-gateway-rev2.png'
);
```

---

## 4. Provisioning via SQL
To provision all 4 buckets and their security policies in one command, execute the migration:
```bash
supabase/migrations/20261113000002_create_storage_buckets.sql
```
or run `supabase/migrations/20261113_master_schema_and_storage.sql` in the **Supabase SQL Editor**.
