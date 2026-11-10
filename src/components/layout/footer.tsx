'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram, Github, Twitter, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t border-theme-border bg-theme-surface text-theme-body transition-colors">
      {/* Newsletter Band */}
      <div className="border-b border-theme-border/60 py-10 bg-brand-light-bg/50 dark:bg-brand-dark-surface/50">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-lg font-bold font-heading text-theme-heading">
              Subscribe to Engineering & IoT Technical Insights
            </h3>
            <p className="mt-1 text-sm text-theme-body">
              Receive updates on new embedded firmware workshops, student hardware project showcases, and institutional innovation programs.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto max-w-md items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter corporate or academic email"
              required
              className="h-11 w-full md:w-72 rounded-md border border-theme-border bg-theme-surface px-4 text-sm text-theme-heading placeholder:text-theme-muted focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              <span>Subscribe</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </Container>
      </div>

      {/* Main Footer Directory */}
      <div className="py-14">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary text-white font-extrabold font-heading text-base dark:bg-brand-dark-blue-accent dark:text-brand-dark-bg">
                HS
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-tight text-theme-heading block">
                  HydroSync Innovations LLP
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-dark-blue-accent block">
                  Technology • IoT • Embedded • AI
                </span>
              </div>
            </div>

            <p className="text-xs text-theme-body leading-relaxed max-w-sm">
              Empowering industry and academia through high-precision embedded firmware architectures, industrial IoT deployments, hands-on engineering internships, and school/college innovation centers.
            </p>

            <div className="space-y-2 pt-2 text-xs text-theme-muted">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-secondary" />
                <span>R&D Lab & Registered Office: Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-secondary" />
                <a href="mailto:contact@hydrosync.in" className="hover:text-brand-secondary">
                  contact@hydrosync.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-secondary" />
                <a href="tel:+919876543210" className="hover:text-brand-secondary">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-8 w-8 rounded-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-8 w-8 rounded-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-heading hover:border-theme-heading transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-8 w-8 rounded-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-red-500 hover:border-red-500 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-8 w-8 rounded-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-pink-500 hover:border-pink-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="h-8 w-8 rounded-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-heading hover:border-theme-heading transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-heading mb-4 font-heading">
              Technical Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/internships" className="hover:text-brand-secondary transition-colors">
                  Engineering Internships
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-secondary transition-colors">
                  Technical Courses
                </Link>
              </li>
              <li>
                <Link href="/live-classes" className="hover:text-brand-secondary transition-colors">
                  Live Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-brand-secondary transition-colors font-semibold text-brand-secondary">
                  Apply for Admission
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-brand-secondary transition-colors">
                  Certification Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-heading mb-4 font-heading">
              Institutions & Enterprise
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/for-schools" className="hover:text-brand-secondary transition-colors">
                  School STEM & ATL Setup
                </Link>
              </li>
              <li>
                <Link href="/for-colleges" className="hover:text-brand-secondary transition-colors">
                  College MoUs & CoE Labs
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-secondary transition-colors">
                  Industrial IoT Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-secondary transition-colors">
                  Project Showcase
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-brand-secondary transition-colors">
                  Academic Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-heading mb-4 font-heading">
              Corporate & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-brand-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-brand-secondary transition-colors">
                  Leadership & Instructors
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-secondary transition-colors">
                  Careers & Openings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-secondary transition-colors">
                  Contact Directory
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-secondary transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-brand-secondary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-brand-secondary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-theme-border/60 py-6 text-center text-xs text-theme-muted">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} HydroSync Innovations LLP. All rights reserved.
          </p>
          <p className="text-[11px]">
            Operating in IoT, Embedded Systems, AI & Technical Workforce Enablement.
          </p>
        </Container>
      </div>
    </footer>
  );
}

