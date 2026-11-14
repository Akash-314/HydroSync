import * as React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { HydroSyncLogo } from '@/components/layout/logo';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg text-theme-body dark:text-brand-dark-body transition-colors">
      {/* 1. Newsletter Subscription Band */}
      <div className="border-b border-theme-border/60 dark:border-brand-dark-border/60 py-10 bg-brand-light-bg/50 dark:bg-brand-dark-bg-alt/70">
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
              Engineering Dispatch
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading mt-1">
              Subscribe to Engineering &amp; IoT Technical Insights
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
              Updates on new embedded firmware workshops, student hardware project showcases, and institutional innovation programs.
            </p>
          </div>

          <div className="w-full lg:w-auto max-w-md">
            <NewsletterForm />
          </div>
        </Container>
      </div>

      {/* 2. Main Multi-Column Directory */}
      <div className="py-14 sm:py-16">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand, Tagline, Short Description, Address (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <HydroSyncLogo />

            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-brand-light-bg text-brand-secondary dark:bg-brand-dark-surface dark:text-brand-dark-secondary border border-theme-border/60 dark:border-brand-dark-border/60">
              {siteConfig.tagline}
            </div>

            <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Direct Contact Points */}
            <div className="space-y-2.5 pt-2 text-xs text-theme-muted dark:text-brand-dark-secondary">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-secondary dark:text-brand-midnight-azure mt-0.5" />
                <span className="leading-snug">{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-secondary dark:text-brand-midnight-azure" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-brand-secondary dark:hover:text-brand-midnight-yellow transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              {siteConfig.contact.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-brand-secondary dark:text-brand-midnight-azure" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-brand-secondary dark:hover:text-brand-midnight-yellow transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Verified Social Media Links: Facebook, Instagram, YouTube */}
            <div className="pt-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-theme-heading dark:text-brand-dark-heading mb-2">
                Connect on Social Channels
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HydroSync Innovations on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-theme-muted dark:text-brand-dark-secondary hover:border-blue-600 hover:text-blue-600 dark:hover:border-brand-midnight-azure dark:hover:text-brand-midnight-azure transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HydroSync Innovations on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-theme-muted dark:text-brand-dark-secondary hover:border-pink-600 hover:text-pink-600 dark:hover:border-pink-400 dark:hover:text-pink-400 transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HydroSync Innovations on YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-theme-muted dark:text-brand-dark-secondary hover:border-red-600 hover:text-red-600 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-heading dark:text-brand-dark-heading font-heading">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {siteConfig.footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-theme-body dark:text-brand-dark-secondary hover:text-brand-secondary dark:hover:text-brand-midnight-azure transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="font-semibold text-brand-secondary dark:text-brand-midnight-yellow hover:underline inline-block py-0.5"
                >
                  Apply Now &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy & Compliance Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-heading dark:text-brand-dark-heading font-heading">
              Governance &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.footerPolicyLinks.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="text-theme-body dark:text-brand-dark-secondary hover:text-brand-secondary dark:hover:text-brand-midnight-azure transition-colors inline-block py-0.5"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="font-medium text-theme-muted hover:text-brand-secondary dark:hover:text-brand-midnight-yellow transition-colors inline-block py-0.5"
                >
                  Staff / Admin Sign In →
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="font-medium text-theme-muted hover:text-brand-secondary dark:hover:text-brand-midnight-yellow transition-colors inline-block py-0.5"
                >
                  Create Account / Register →
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-theme-muted dark:text-brand-dark-muted border-t border-theme-border/60 dark:border-brand-dark-border/60">
              <span className="font-semibold text-theme-heading dark:text-brand-dark-heading block">
                Educational Disclosures
              </span>
              <span>
                All technical training, internships and certifications are governed under LLP corporate policies.
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Bottom Legal Copyright Bar */}
      <div className="border-t border-theme-border/60 dark:border-brand-dark-border/60 py-6 text-center text-xs text-theme-muted dark:text-brand-dark-muted bg-theme-surface dark:bg-brand-dark-bg">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px]">
            Operating in IoT, Embedded Systems, AI, Technical Training, Internships &amp; Innovation.
          </p>
        </Container>
      </div>
    </footer>
  );
}
