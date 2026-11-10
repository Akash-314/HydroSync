'use client';

import * as React from 'react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                <h3 className="text-xl font-bold font-heading text-theme-heading">
                  HydroSync Innovations LLP
                </h3>
                <p className="mt-2 text-sm text-theme-body leading-relaxed">
                  Have an enquiry about industrial IoT prototyping, college MoUs, or upcoming technical internships? Visit our hardware facility or reach out directly.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-theme-border text-sm text-theme-body">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand-secondary mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading block">Registered Office &amp; Lab</span>
                    <span className="text-xs text-theme-muted">
                      Electronics City, Phase 1, Bengaluru, Karnataka 560100, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand-secondary mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading block">Official Email</span>
                    <a href="mailto:contact@hydrosync.in" className="text-xs text-brand-secondary hover:underline">
                      contact@hydrosync.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-secondary mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading block">Direct Phone</span>
                    <a href="tel:+919876543210" className="text-xs text-theme-muted hover:text-brand-secondary">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-secondary mt-0.5" />
                  <div>
                    <span className="font-semibold text-theme-heading block">Working Hours</span>
                    <span className="text-xs text-theme-muted">
                      Monday &ndash; Saturday: 9:00 AM &ndash; 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="p-4 rounded-xl border border-brand-innovation-green/30 bg-brand-innovation-green/5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-innovation-green">
                  <MessageSquare className="h-4 w-4" />
                  <span>Instant WhatsApp Business</span>
                </div>
                <p className="text-xs text-theme-body">
                  For quick questions regarding batch timings or institutional meetings:
                </p>
                <Button
                  href="https://wa.me/919876543210?text=Hello%20HydroSync%2C%20I%20have%20an%20enquiry."
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Open WhatsApp Chat
                </Button>
              </div>

              {/* Google Maps Embed Container */}
              <div className="rounded-xl border border-theme-border bg-theme-surface overflow-hidden aspect-[16/9] flex items-center justify-center p-4 text-center">
                <div className="space-y-1">
                  <MapPin className="h-6 w-6 text-brand-secondary mx-auto" />
                  <span className="text-xs font-semibold text-theme-heading block">Interactive Map Location</span>
                  <span className="text-[11px] text-theme-muted block">Bengaluru Tech Hub &bull; 12.8452&deg; N, 77.6602&deg; E</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold font-heading text-theme-heading mb-1">
                  Send an Official Enquiry
                </h3>
                <p className="text-xs text-theme-muted mb-6">
                  Fill in your details below. Our technical team responds within 24 business hours.
                </p>

                {submitted ? (
                  <div className="p-8 text-center space-y-4 rounded-xl border border-brand-innovation-green/30 bg-brand-innovation-green/10">
                    <CheckCircle2 className="h-12 w-12 text-brand-innovation-green mx-auto" />
                    <h4 className="text-lg font-bold font-heading text-theme-heading">
                      Enquiry Successfully Received
                    </h4>
                    <p className="text-xs text-theme-body max-w-sm mx-auto">
                      Thank you for contacting HydroSync Innovations LLP. A confirmation has been registered, and our domain specialist will follow up shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name" htmlFor="fullName" required>
                        <Input id="fullName" placeholder="e.g. Rahul Sharma" required />
                      </FormField>
                      <FormField label="Email Address" htmlFor="email" required>
                        <Input id="email" type="email" placeholder="e.g. rahul@example.com" required />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Phone Number" htmlFor="phone" required>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                      </FormField>
                      <FormField label="Enquiry Category" htmlFor="category" required>
                        <Select id="category" defaultValue="Internship">
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
                        placeholder="Please share specific requirements, college/organization name, or question..."
                        required
                      />
                    </FormField>

                    <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                      Submit Official Enquiry
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

