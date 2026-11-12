import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/forms/contact-form';
import { Mail, MapPin, Clock, Building2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Directory & Enquiries',
  description:
    'Connect with the HydroSync Innovations LLP engineering laboratory, corporate office, or admissions advisory team.',
};

export default function ContactPage() {
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
            {/* Left 5 Cols: Directory Information (Server Rendered) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  {siteConfig.name}
                </h2>
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

            {/* Right 7 Cols: Interactive Form Island */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1">
                  Send an Official Enquiry
                </h3>
                <p className="text-xs text-theme-muted dark:text-brand-dark-muted mb-6">
                  Fill in your details below. Your submission will be routed to the appropriate engineering or admissions lead.
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
