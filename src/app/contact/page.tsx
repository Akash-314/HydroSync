'use client';

import * as React from 'react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Clock, CheckCircle2, Building2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const category = (formData.get('category') as string) || 'Other';
    const message = (formData.get('message') as string) || '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, category, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while submitting your enquiry.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Direct Enquiries"
        title="Contact &amp; Physical Directory"
        subtitle="Connect with our engineering laboratory, corporate office, or admissions advisory team."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Cols: Directory Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  {siteConfig.name}
                </h3>
                <p className="mt-2 text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Have an enquiry about industrial IoT prototyping, college MoUs, or upcoming technical internships? Connect with our engineering and admissions desk.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-theme-border dark:border-brand-dark-border text-sm text-theme-body dark:text-brand-dark-body">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand-secondary dark:text-brand-midnight-azure mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading dark:text-brand-dark-heading block">
                      Registered Location &amp; Facilities
                    </span>
                    <span className="text-xs text-theme-muted dark:text-brand-dark-muted">
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand-secondary dark:text-brand-midnight-azure mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading dark:text-brand-dark-heading block">
                      Official Corporate Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-brand-secondary dark:text-brand-midnight-azure hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-secondary dark:text-brand-midnight-azure mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading dark:text-brand-dark-heading block">
                      Working Hours
                    </span>
                    <span className="text-xs text-theme-muted dark:text-brand-dark-muted">
                      {siteConfig.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corporate Communication Notice */}
              <div className="p-4 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-theme-heading dark:text-brand-dark-heading">
                  <Building2 className="h-4 w-4 text-brand-secondary dark:text-brand-midnight-azure" />
                  <span>Direct Communication Protocol</span>
                </div>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  For formal institutional partnerships, college MoUs, or commercial development requirements, submit the official enquiry form. Our technical team responds within 24 business hours.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Official Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1">
                  Send an Official Enquiry
                </h3>
                <p className="text-xs text-theme-muted dark:text-brand-dark-muted mb-6">
                  Fill in your details below. Your submission will be routed to the appropriate engineering or admissions lead.
                </p>

                {submitted ? (
                  <div className="p-8 text-center space-y-4 rounded-xl border border-brand-innovation-green/30 bg-brand-innovation-green/10">
                    <CheckCircle2 className="h-12 w-12 text-brand-innovation-green mx-auto" />
                    <h4 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                      Enquiry Successfully Received
                    </h4>
                    <p className="text-xs text-theme-body dark:text-brand-dark-body max-w-sm mx-auto">
                      Thank you for contacting HydroSync Innovations LLP. A confirmation has been registered, and our domain specialist will follow up shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name" htmlFor="fullName" required>
                        <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
                      </FormField>
                      <FormField label="Email Address" htmlFor="email" required>
                        <Input id="email" name="email" type="email" placeholder="name@organization.com" required />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Phone Number" htmlFor="phone" required>
                        <Input id="phone" name="phone" type="tel" placeholder="10-digit mobile number" required />
                      </FormField>
                      <FormField label="Enquiry Category" htmlFor="category" required>
                        <Select id="category" name="category" defaultValue="Internship">
                          <option value="Internship">Internship Application</option>
                          <option value="Course">Technical Course Enquiry</option>
                          <option value="School">School STEM / ATL Setup</option>
                          <option value="College">College MoU / CoE Lab</option>
                          <option value="Enterprise">Industrial IoT Prototyping</option>
                          <option value="Other">General Corporate Enquiry</option>
                        </Select>
                      </FormField>
                    </div>

                    <FormField label="Message / Requirement Details" htmlFor="message" required>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please share specific requirements, college/organization name, or question..."
                        required
                      />
                    </FormField>

                    <Button type="submit" variant="cta" size="md" className="w-full sm:w-auto" disabled={loading}>
                      {loading ? 'Submitting Enquiry...' : 'Submit Official Enquiry'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
