'use client';

import * as React from 'react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ApplyPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="Admissions &amp; Registrations"
        title="Application Portal: V1 Intake"
        subtitle="Submit your application for Technical Internships, Core Training Courses, or Live Masterclasses."
        breadcrumbs={[{ label: 'Apply Now' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-4 rounded-xl border border-brand-innovation-green/30 bg-brand-innovation-green/10">
                <CheckCircle2 className="h-12 w-12 text-brand-innovation-green mx-auto" />
                <h3 className="text-xl font-bold font-heading text-theme-heading">
                  Application Registered
                </h3>
                <p className="text-sm text-theme-body max-w-md mx-auto">
                  Thank you for applying to HydroSync Innovations LLP. Our admissions coordinator will review your profile and contact you via email and WhatsApp regarding next onboarding steps.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-theme-heading">
                    Candidate &amp; Program Information
                  </h3>
                  <p className="text-xs text-theme-muted mt-1">
                    Please provide accurate academic information for certificate verification and kit delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" htmlFor="appFullName" required>
                    <Input id="appFullName" placeholder="e.g. Sneha Patel" required />
                  </FormField>
                  <FormField label="Email Address" htmlFor="appEmail" required>
                    <Input id="appEmail" type="email" placeholder="e.g. sneha@college.edu" required />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Phone / WhatsApp Number" htmlFor="appPhone" required>
                    <Input id="appPhone" type="tel" placeholder="+91 98765 43210" required />
                  </FormField>
                  <FormField label="Program Track" htmlFor="appProgram" required>
                    <Select id="appProgram" defaultValue="Embedded Internship">
                      <option value="Embedded Internship">Embedded Firmware Internship (3 Mo)</option>
                      <option value="IoT Internship">Industrial IoT &amp; Telemetry Internship (3 Mo)</option>
                      <option value="Edge AI Internship">Edge AI &amp; TinyML Internship (3 Mo)</option>
                      <option value="IoT Course">Industrial IoT Systems Course</option>
                      <option value="Embedded Course">ARM Cortex-M Firmware Course</option>
                      <option value="Live Workshop">Upcoming Weekend Workshop</option>
                    </Select>
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="College / University Name" htmlFor="appCollege" required>
                    <Input id="appCollege" placeholder="e.g. RV College of Engineering" required />
                  </FormField>
                  <FormField label="Degree &amp; Graduation Year" htmlFor="appDegree" required>
                    <Input id="appDegree" placeholder="e.g. B.Tech ECE, 2027" required />
                  </FormField>
                </div>

                <FormField
                  label="GitHub / Portfolio URL (Optional)"
                  htmlFor="appGithub"
                  helperText="Share links to past code repositories, hardware builds, or LinkedIn."
                >
                  <Input id="appGithub" type="url" placeholder="https://github.com/username" />
                </FormField>

                <FormField
                  label="Statement of Purpose / Learning Goals"
                  htmlFor="appGoals"
                  required
                >
                  <Textarea
                    id="appGoals"
                    placeholder="Briefly describe what you hope to build and master during your time at HydroSync..."
                    required
                  />
                </FormField>

                <div className="flex items-center gap-2 p-3 rounded-lg border border-theme-border bg-theme-bg text-xs text-theme-muted">
                  <ShieldCheck className="h-4 w-4 text-brand-innovation-green shrink-0" />
                  <span>Your academic details are processed strictly for course admissions and mentor allocation.</span>
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full">
                  Submit Official Application
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

