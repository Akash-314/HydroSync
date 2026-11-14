/**
 * HydroSync Innovations LLP — Database & Storage Integration Verification Suite
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local
let envConfig = {};
try {
  const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        envConfig[key] = val;
      }
    }
  });
} catch (e) {
  console.log('No .env.local found');
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY || envConfig.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('================================================================');
console.log('HYDROSYNC SUPABASE INTEGRATION AUDIT & TEST SUITE');
console.log('================================================================');
console.log('Supabase URL Configured        :', Boolean(supabaseUrl));
console.log('Supabase Anon Key Configured   :', Boolean(supabaseAnonKey));
console.log('Supabase Service Key Configured:', Boolean(supabaseServiceKey));
if (supabaseUrl) console.log('Target Project Endpoint        :', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Result: UNCONFIGURED (Missing URL or Anon Key)');
  process.exit(1);
}

const anonClient = createClient(supabaseUrl, supabaseAnonKey);
const privilegedClient = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

const CATALOG_TABLES = [
  'courses',
  'internship_programs',
  'services',
  'events',
  'projects',
  'team_members',
  'faqs',
  'testimonials',
  'partners',
  'site_settings',
  'gallery_items'
];

const SUBMISSION_TABLES = [
  'contact_enquiries',
  'internship_applications',
  'course_enquiries',
  'event_registrations',
  'institutional_enquiries',
  'career_applications',
  'newsletter_subscriptions'
];

const ADMIN_TABLES = [
  'admin_users',
  'admin_audit_logs',
  'candidate_status_history',
  'batches',
  'form_field_configs',
  'page_sections',
  'blog_posts'
];

const STORAGE_BUCKETS = [
  'application-attachments',
  'public-assets',
  'project-media',
  'gallery'
];

async function runAudit() {
  console.log('\n--- 1. Testing Public Catalog Tables (Anon Client) ---');
  for (const t of CATALOG_TABLES) {
    try {
      const { data, error, status } = await anonClient.from(t).select('*').limit(1);
      if (error) {
        if (error.code === '42501') {
          console.log(`[CATALOG] ${t.padEnd(25)}: PERMISSION DENIED (Code 42501 - Needs GRANT in SQL Editor)`);
        } else if (error.code === '42P01' || error.code === 'PGRST205') {
          console.log(`[CATALOG] ${t.padEnd(25)}: PENDING_MIGRATION (Table not yet created in Supabase)`);
        } else {
          console.log(`[CATALOG] ${t.padEnd(25)}: ERROR ${error.code} (${error.message})`);
        }
      } else {
        console.log(`[CATALOG] ${t.padEnd(25)}: CONNECTED & READY (Status: ${status}, Rows: ${data.length})`);
      }
    } catch (err) {
      console.log(`[CATALOG] ${t.padEnd(25)}: EXCEPTION (${err.message})`);
    }
  }

  console.log('\n--- 2. Testing Submission Tables (Anon Client) ---');
  for (const t of SUBMISSION_TABLES) {
    try {
      const { data, error, status } = await anonClient.from(t).select('*').limit(1);
      if (error) {
        if (error.code === '42501') {
          console.log(`[TABLE]   ${t.padEnd(25)}: PERMISSION DENIED (Code 42501 - Needs GRANT in SQL Editor)`);
        } else if (error.code === '42P01' || error.code === 'PGRST205') {
          console.log(`[TABLE]   ${t.padEnd(25)}: PENDING_MIGRATION (Table not yet created in Supabase)`);
        } else {
          console.log(`[TABLE]   ${t.padEnd(25)}: ERROR ${error.code} (${error.message})`);
        }
      } else {
        console.log(`[TABLE]   ${t.padEnd(25)}: CONNECTED & READY (Status: ${status}, Rows: ${data.length})`);
      }
    } catch (err) {
      console.log(`[TABLE]   ${t.padEnd(25)}: EXCEPTION (${err.message})`);
    }
  }

  console.log('\n--- 3. Testing Admin & CMS Tables ---');
  const testClient = privilegedClient || anonClient;
  for (const t of ADMIN_TABLES) {
    try {
      const { data, error, status } = await testClient.from(t).select('*').limit(1);
      if (error) {
        if (error.code === '42501') {
          console.log(`[ADMIN]   ${t.padEnd(25)}: PERMISSION DENIED (Code 42501 - Needs GRANT in SQL Editor)`);
        } else if (error.code === '42P01' || error.code === 'PGRST205') {
          console.log(`[ADMIN]   ${t.padEnd(25)}: PENDING_MIGRATION (Table not yet created in Supabase)`);
        } else {
          console.log(`[ADMIN]   ${t.padEnd(25)}: ERROR ${error.code} (${error.message})`);
        }
      } else {
        console.log(`[ADMIN]   ${t.padEnd(25)}: CONNECTED & READY (Status: ${status}, Rows: ${data.length})`);
      }
    } catch (err) {
      console.log(`[ADMIN]   ${t.padEnd(25)}: EXCEPTION (${err.message})`);
    }
  }

  console.log('\n--- 4. Testing Supabase Auth Subsystem ---');
  try {
    const { data: authData, error: authErr } = await anonClient.auth.getSession();
    if (authErr) {
      console.log('[AUTH]    Session check error:', authErr.message);
    } else {
      console.log('[AUTH]    Auth Service: CONNECTED & OPERATIONAL (Session active:', Boolean(authData.session), ')');
    }
  } catch (err) {
    console.log('[AUTH]    Exception:', err.message);
  }

  console.log('\n--- 5. Testing Supabase Storage Buckets ---');
  for (const b of STORAGE_BUCKETS) {
    try {
      const { data, error } = await anonClient.storage.from(b).list('', { limit: 1 });
      if (error) {
        console.log(`[STORAGE] Bucket '${b.padEnd(24)}': RESTRICTED (${error.message})`);
      } else {
        console.log(`[STORAGE] Bucket '${b.padEnd(24)}': CONNECTED & ACCESSIBLE (Objects found: ${data.length})`);
      }
    } catch (err) {
      console.log(`[STORAGE] Bucket '${b.padEnd(24)}': EXCEPTION (${err.message})`);
    }
  }

  console.log('\n================================================================');
  console.log('AUDIT COMPLETED');
  console.log('================================================================\n');
}

runAudit();
