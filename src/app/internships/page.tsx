'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Radio,
  Binary,
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Award,
  Layers,
  ShieldCheck,
  Send,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { INTERNSHIP_PROGRAMS, INTERNSHIP_FAQS, InternshipProgram } from '@/data/internships';

export default function InternshipsPage() {
  // Form State
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    yearOfStudy: '3rd Year',
    areaOfInterest: 'Embedded Firmware & Bare-Metal C/C++',
    preferredProgram: 'Embedded Firmware & Bare-Metal C/C++',
    preferredMode: 'Hybrid',
    resumeUrl: '',
    additionalMessage: '',
    consent: false,
    website_trap: '', // Anti-spam honeypot
  });

  const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [applicationId, setApplicationId] = React.useState('');

  const handleProgramSelect = (programTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredProgram: programTitle,
      areaOfInterest: programTitle,
    }));
    // Smooth scroll to application form
    const formElement = document.getElementById('application-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation checks
    if (!formData.fullName.trim()) {
      setFormStatus('error');
      setStatusMessage('Please enter your full legal name.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!formData.college.trim()) {
      setFormStatus('error');
      setStatusMessage('Please enter your college or institution name.');
      return;
    }
    if (!formData.branch.trim()) {
      setFormStatus('error');
      setStatusMessage('Please specify your course and engineering branch.');
      return;
    }
    if (!formData.consent) {
      setFormStatus('error');
      setStatusMessage('Please accept the consent checkbox to submit your application.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
        setStatusMessage(result.message || 'Your application has been registered successfully.');
        setApplicationId(result.applicationId || 'HS-PENDING');
      } else {
        setFormStatus('error');
        setStatusMessage(result.message || 'Unable to submit application. Please verify your connection.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus('error');
      setStatusMessage('Network connectivity error. Please try again or reach out on WhatsApp.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          SECTION 1 — INTERNSHIP OVERVIEW & PAGE HERO
         ========================================================================= */}
      <PageHero
        eyebrow="Workforce Enablement"
        title="Technical Engineering Internships"
        subtitle="Bridging academia and industrial hardware engineering through direct development kits, register-level code reviews, and physical workbench testing."
        breadcrumbs={[{ label: 'Internships' }]}
        actions={
          <>
            <Button
              onClick={() => {
                const el = document.getElementById('application-form-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="primary"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                const el = document.getElementById('available-programs');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="secondary"
            >
              Explore Available Tracks
            </Button>
          </>
        }
      />

      {/* Program Quick Summary Bar */}
      <section className="py-8 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
              <span className="text-[10px] font-mono uppercase text-theme-muted block">Kit Included</span>
              <span className="text-xs sm:text-sm font-bold text-theme-heading mt-0.5 block">Physical Dev Hardware</span>
            </div>
            <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
              <span className="text-[10px] font-mono uppercase text-theme-muted block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-theme-heading mt-0.5 block">1 / 3 / 6 Months</span>
            </div>
            <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
              <span className="text-[10px] font-mono uppercase text-theme-muted block">Delivery Modes</span>
              <span className="text-xs sm:text-sm font-bold text-theme-heading mt-0.5 block">Online &bull; Offline &bull; Hybrid</span>
            </div>
            <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
              <span className="text-[10px] font-mono uppercase text-theme-muted block">Academic Integration</span>
              <span className="text-xs sm:text-sm font-bold text-theme-heading mt-0.5 block">College Project NOC Support</span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTIONS 2, 3, 4, 5, 6, 7 & 8 — AVAILABLE PROGRAMS & DETAILED SPECS
          - Program Descriptions, Durations, Modes, Eligibility, Benefits, Stipends
         ========================================================================= */}
      <section id="available-programs" className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Specialization Tracks"
            title="Available Internship Programs"
            subtitle="Select an engineering track aligned with your career goals. Every candidate works on physical silicon."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {INTERNSHIP_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors"
              >
                <div className="space-y-5">
                  {/* Header & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-theme-border/70 pb-4">
                    <Badge
                      variant={
                        program.domain === 'IoT'
                          ? 'iot'
                          : program.domain === 'Edge AI'
                          ? 'ai'
                          : program.domain === 'Embedded Systems'
                          ? 'embedded'
                          : 'default'
                      }
                    >
                      {program.domain}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-theme-muted font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-brand-secondary" />
                        {program.durations[0]} &ndash; {program.durations[program.durations.length - 1]}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold font-heading text-theme-heading">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-theme-body leading-relaxed">
                      {program.summary}
                    </p>
                  </div>

                  {/* Modes & Hardware Kit Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
                      <span className="text-[10px] font-mono uppercase text-theme-muted block">Available Modes</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {program.modes.map((mode) => (
                          <span
                            key={mode}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-theme-surface border border-theme-border text-theme-heading"
                          >
                            {mode}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
                      <span className="text-[10px] font-mono uppercase text-theme-muted block">Hardware Package</span>
                      <span className="font-semibold text-theme-heading block mt-1 leading-snug">
                        {program.hardwareKit}
                      </span>
                    </div>
                  </div>

                  {/* Skills Gained */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-theme-heading block mb-2">
                      Key Competencies Developed
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-theme-body">
                      {program.skillsGained.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="pt-3 border-t border-theme-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-theme-heading block mb-1.5">
                      Eligibility &amp; Prerequisites
                    </span>
                    <ul className="space-y-1 text-xs text-theme-muted">
                      {program.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand-secondary">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stipend Information (Verified Plain Disclosure) */}
                  <div className="p-3 rounded-lg border border-theme-border/80 bg-brand-light-bg/50 dark:bg-brand-dark-surface/50 text-xs text-theme-muted">
                    <span className="font-semibold text-theme-heading block mb-0.5">
                      Stipend &amp; Honorarium Framework:
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {program.stipendNote}
                    </p>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between gap-4">
                  <span className="text-xs text-theme-muted">
                    Batches commencing monthly
                  </span>
                  <Button
                    onClick={() => handleProgramSelect(program.title)}
                    variant="primary"
                    size="sm"
                  >
                    <span>Apply for this Track</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9 — APPLICATION PROCESS (4-Step Pathway)
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <SectionHeader
            eyebrow="Onboarding Protocol"
            title="The Internship Application Process"
            subtitle="Transparent four-step procedure from profile intake to physical hardware defense."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <span className="font-mono text-2xl font-extrabold text-brand-secondary block mb-2">01</span>
              <h4 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                Online Application
              </h4>
              <p className="text-xs text-theme-body leading-relaxed">
                Submit candidate details, college affiliation, area of interest, and preferred delivery mode using the form below.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <span className="font-mono text-2xl font-extrabold text-brand-secondary block mb-2">02</span>
              <h4 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                Technical Review
              </h4>
              <p className="text-xs text-theme-body leading-relaxed">
                Domain mentors review programming and electronics prerequisites to ensure proper track placement.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <span className="font-mono text-2xl font-extrabold text-brand-secondary block mb-2">03</span>
              <h4 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                Onboarding &amp; Kit Dispatch
              </h4>
              <p className="text-xs text-theme-body leading-relaxed">
                Receive batch orientation schedules and physical development kit shipment with code repository access.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <span className="font-mono text-2xl font-extrabold text-brand-secondary block mb-2">04</span>
              <h4 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                Defense &amp; Certification
              </h4>
              <p className="text-xs text-theme-body leading-relaxed">
                Present live working hardware circuits before engineering mentors to earn verified completion credentials.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 10 — FREQUENTLY ASKED INTERNSHIP QUESTIONS
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow="Common Questions"
            title="Internship FAQs"
            subtitle="Answers regarding kit shipping, college project guidelines, batch timings, and evaluation criteria."
            align="center"
          />

          <Accordion>
            {INTERNSHIP_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                title={faq.question}
                defaultOpen={index === 0}
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 11 — DEDICATED APPLICATION FORM (Mobile-First, Strictly Validated)
         ========================================================================= */}
      <section id="application-form-section" className="py-16 md:py-20 bg-theme-surface">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-10 shadow-sm">
            <div className="border-b border-theme-border pb-4 mb-6">
              <Badge variant="iot" className="mb-2">Official Intake</Badge>
              <h3 className="text-2xl font-bold font-heading text-theme-heading">
                Internship Application Form
              </h3>
              <p className="mt-1 text-xs text-theme-muted">
                Please provide accurate academic information for kit allocation and college NOC documentation.
              </p>
            </div>

            {/* Submission Status Alerts */}
            {formStatus === 'success' && (
              <div className="p-6 rounded-xl border border-brand-innovation-green/40 bg-brand-innovation-green/10 text-center space-y-3 mb-6">
                <CheckCircle2 className="h-10 w-10 text-brand-innovation-green mx-auto" />
                <h4 className="text-lg font-bold font-heading text-theme-heading">
                  Application Successfully Registered
                </h4>
                <p className="text-xs text-theme-body max-w-md mx-auto">
                  {statusMessage}
                </p>
                <div className="inline-block p-2 rounded-md bg-theme-surface border border-theme-border font-mono text-xs text-theme-heading">
                  Application Tracking Ref: <strong className="text-brand-secondary">{applicationId}</strong>
                </div>
                <p className="text-[11px] text-theme-muted">
                  Our admissions coordinator will contact you via email and phone with onboarding details.
                </p>
                <Button
                  onClick={() => {
                    setFormStatus('idle');
                    setStatusMessage('');
                  }}
                  variant="secondary"
                  size="sm"
                >
                  Submit Another Application
                </Button>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="p-4 rounded-lg border border-red-500/40 bg-red-500/10 flex items-start gap-3 mb-6 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Validation Notice:</strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
            )}

            {formStatus !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-spam trap field (invisible to real human candidates) */}
                <input
                  type="text"
                  name="website_trap"
                  value={formData.website_trap}
                  onChange={handleInputChange}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Candidate Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" htmlFor="fullName" required>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Siddharth Verma"
                      required
                    />
                  </FormField>

                  <FormField label="Email Address" htmlFor="email" required>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. siddharth@college.edu"
                      required
                    />
                  </FormField>
                </div>

                {/* Phone & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Phone / WhatsApp Number" htmlFor="phone" required>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      required
                    />
                  </FormField>

                  <FormField label="College / Institution Name" htmlFor="college" required>
                    <Input
                      id="college"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. National Institute of Engineering"
                      required
                    />
                  </FormField>
                </div>

                {/* Course/Branch & Year of Study */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Course / Branch" htmlFor="branch" required>
                    <Input
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      placeholder="e.g. B.Tech Electronics & Communication"
                      required
                    />
                  </FormField>

                  <FormField label="Year of Study" htmlFor="yearOfStudy" required>
                    <Select
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                    >
                      <option value="1st Year">1st Year / Foundation</option>
                      <option value="2nd Year">2nd Year / Pre-Intermediate</option>
                      <option value="3rd Year">3rd Year / Capstone Preparation</option>
                      <option value="4th Year / Final">4th Year / Final Semester Project</option>
                      <option value="Postgraduate / Alumni">Postgraduate (M.Tech) / Recent Graduate</option>
                    </Select>
                  </FormField>
                </div>

                {/* Program Track & Preferred Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Preferred Internship Track" htmlFor="preferredProgram" required>
                    <Select
                      id="preferredProgram"
                      name="preferredProgram"
                      value={formData.preferredProgram}
                      onChange={handleInputChange}
                    >
                      {INTERNSHIP_PROGRAMS.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Preferred Mode" htmlFor="preferredMode" required>
                    <Select
                      id="preferredMode"
                      name="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleInputChange}
                    >
                      <option value="Online">Online (Kit Shipped to Address)</option>
                      <option value="Offline">Offline (Bengaluru Lab Workbench)</option>
                      <option value="Hybrid">Hybrid (Remote + Laboratory Sprints)</option>
                    </Select>
                  </FormField>
                </div>

                {/* Optional Resume URL / Portfolio */}
                <FormField
                  label="Resume / Portfolio Link (Optional)"
                  htmlFor="resumeUrl"
                  helperText="Provide a Google Drive, GitHub, or LinkedIn URL."
                >
                  <Input
                    id="resumeUrl"
                    name="resumeUrl"
                    type="url"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username or LinkedIn URL"
                  />
                </FormField>

                {/* Additional Statement */}
                <FormField label="Additional Message / Specific Learning Goals" htmlFor="additionalMessage">
                  <Textarea
                    id="additionalMessage"
                    name="additionalMessage"
                    value={formData.additionalMessage}
                    onChange={handleInputChange}
                    placeholder="Briefly state your technical background, specific hardware project interests, or batch availability..."
                    rows={3}
                  />
                </FormField>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-theme-border text-brand-primary focus:ring-brand-secondary mt-0.5"
                    />
                    <span className="text-xs text-theme-body leading-relaxed">
                      I confirm that the academic details provided are accurate and consent to receive communication regarding this application via email, phone, or WhatsApp from HydroSync Innovations LLP.
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    isLoading={formStatus === 'submitting'}
                    className="w-full text-sm font-bold shadow-sm"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    <span>Submit Internship Application</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
