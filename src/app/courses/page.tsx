'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Clock,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  ArrowRight,
  ShieldCheck,
  Tag,
  BookOpen,
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
import {
  COURSES_DATA,
  COURSE_CATEGORIES,
  COURSES_FAQS,
  Course,
} from '@/data/courses';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All Categories');
  const [expandedCourseId, setExpandedCourseId] = React.useState<string | null>(null);

  // Enquiry Form State
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    courseOfInterest: COURSES_DATA[0]?.title || '',
    learningMode: 'Hybrid',
    message: '',
    consent: false,
    website_trap: '',
  });

  const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [enquiryId, setEnquiryId] = React.useState('');

  // Filter courses based on active category
  const filteredCourses = React.useMemo(() => {
    if (selectedCategory === 'All Categories') return COURSES_DATA;
    return COURSES_DATA.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  const handleEnquireCourse = (courseTitle: string, defaultMode: string) => {
    setFormData((prev) => ({
      ...prev,
      courseOfInterest: courseTitle,
      learningMode: defaultMode.includes('Classroom') ? 'Classroom Hands-on' : defaultMode.includes('Online') ? 'Online Live' : 'Hybrid',
    }));

    const formElement = document.getElementById('enquiry-form-section');
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
      setStatusMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.college.trim()) {
      setFormStatus('error');
      setStatusMessage('Please specify your college, institution, or organization name.');
      return;
    }
    if (!formData.consent) {
      setFormStatus('error');
      setStatusMessage('Please check the consent box to proceed with your course enquiry.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
        setStatusMessage(result.message || 'Your course enquiry has been received successfully.');
        setEnquiryId(result.enquiryId || 'HS-ENQ-PENDING');
      } else {
        setFormStatus('error');
        setStatusMessage(result.message || 'Unable to submit enquiry. Please verify your connection.');
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
          1. COURSE INTRODUCTION & PAGE HERO
         ========================================================================= */}
      <PageHero
        eyebrow="Hands-On Engineering Curriculum"
        title="Technical Training &amp; Courses"
        subtitle="Industrial courses in IoT, Embedded Systems, ARM Cortex-M, ESP32, TinyML, Python, and Drone Technology with physical hardware development kits."
        breadcrumbs={[{ label: 'Courses' }]}
        actions={
          <>
            <Button
              onClick={() => {
                const el = document.getElementById('enquiry-form-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="primary"
            >
              <span>Submit Course Enquiry</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                const el = document.getElementById('course-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="secondary"
            >
              Browse Catalog
            </Button>
          </>
        }
      />

      {/* =========================================================================
          2. COURSE CATEGORY OVERVIEW (Filter Bar)
         ========================================================================= */}
      <section className="py-8 border-b border-theme-border bg-theme-surface sticky top-[64px] sm:top-[72px] z-30 shadow-xs backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-muted shrink-0 mr-2">
              Categories:
            </span>
            {COURSE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-white dark:bg-brand-midnight-french dark:text-white'
                    : 'bg-theme-bg text-theme-body border border-theme-border hover:bg-theme-surface hover:text-theme-heading'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. COURSE LISTINGS & CARD DETAILS
         ========================================================================= */}
      <section id="course-listings" className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono font-semibold text-brand-secondary uppercase">
                Curriculum Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading mt-0.5">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'Program' : 'Programs'}
              </h2>
            </div>
            {selectedCategory !== 'All Categories' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('All Categories')}
                className="text-xs font-medium text-brand-secondary hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 border-b border-theme-border/70 pb-3">
                      <Badge variant="iot">{course.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-theme-muted font-medium">
                        <Clock className="h-3.5 w-3.5 text-brand-secondary" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                      <h3 className="text-lg font-bold font-heading text-theme-heading leading-snug">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-xs text-theme-body leading-relaxed line-clamp-3">
                        {course.shortDescription}
                      </p>
                    </div>

                    {/* Metadata Box: Mode & Fee */}
                    <div className="space-y-2 p-3 rounded-lg border border-theme-border bg-theme-bg/60 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-theme-muted">Learning Mode:</span>
                        <span className="font-semibold text-theme-heading">{course.mode}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-theme-border/60">
                        <span className="text-[11px] text-theme-muted">Fee Schedule:</span>
                        <span className="font-semibold text-brand-secondary text-[11px]">{course.fee}</span>
                      </div>
                    </div>

                    {/* Hardware Kit Included Tag */}
                    {course.hardwareKitIncluded && (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-brand-light-bg dark:bg-brand-dark-elevated border border-brand-secondary/30 dark:border-brand-dark-border text-[11px] font-medium text-brand-primary dark:text-brand-dark-heading">
                        <Cpu className="h-4 w-4 shrink-0 text-brand-secondary" />
                        <span>Hands-on Hardware Kit Included in Batch</span>
                      </div>
                    )}

                    {/* Expandable Syllabus & Outcomes */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-theme-border/80 space-y-3 animate-in fade-in-50 duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-theme-heading block mb-1.5">
                            Key Learning Outcomes:
                          </span>
                          <ul className="space-y-1 text-[11px] text-theme-body">
                            {course.outcomes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-innovation-green shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-theme-border/60">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-theme-heading block mb-1">
                            Prerequisites:
                          </span>
                          <p className="text-[11px] text-theme-muted leading-relaxed">
                            {course.prerequisites}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-theme-border space-y-2">
                    <button
                      type="button"
                      onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                      className="w-full text-center text-xs font-semibold text-theme-muted hover:text-theme-heading py-1 transition-colors"
                    >
                      {isExpanded ? 'Hide Detailed Outcomes ▲' : 'View Detailed Outcomes ▼'}
                    </button>

                    <Button
                      onClick={() => handleEnquireCourse(course.title, course.mode)}
                      variant="primary"
                      size="sm"
                      className="w-full text-xs font-bold"
                    >
                      <span>Enquire for Next Batch</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. ENROLLMENT ENQUIRY CTA BANNER
         ========================================================================= */}
      <section className="py-12 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="rounded-2xl border border-theme-border bg-brand-light-bg/60 dark:bg-brand-dark-surface p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                Customized Curriculum
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-heading mt-1">
                Looking for Institutional or Custom Group Training?
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-theme-body leading-relaxed">
                We organize tailored Faculty Development Programs (FDPs) and student semester workshops for engineering universities and technical colleges.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <Button href="/for-colleges" variant="secondary" size="md">
                Institutional MoUs &rarr;
              </Button>
              <Button href="/contact" variant="primary" size="md">
                Contact Academic Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. COURSE FAQ (Accordion)
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow="Admissions &amp; Syllabi"
            title="Course Frequently Asked Questions"
            subtitle="Transparent details regarding fee schedules, hardware shipment, batch formats, and verifiable certificates."
            align="center"
          />

          <Accordion>
            {COURSES_FAQS.map((faq, index) => (
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
          6. COURSE ENQUIRY FORM (Generates Official Lead, No Fake Account/Paywall)
         ========================================================================= */}
      <section id="enquiry-form-section" className="py-16 md:py-20 bg-theme-surface">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-10 shadow-sm">
            <div className="border-b border-theme-border pb-4 mb-6">
              <Badge variant="embedded" className="mb-2">Course Enquiry</Badge>
              <h3 className="text-2xl font-bold font-heading text-theme-heading">
                Course Enquiry Form
              </h3>
              <p className="mt-1 text-xs text-theme-muted">
                Submit an enquiry to receive the complete syllabus, upcoming batch start dates, and hardware kit specifications.
              </p>
            </div>

            {/* Success Alert */}
            {formStatus === 'success' && (
              <div className="p-6 rounded-xl border border-brand-innovation-green/40 bg-brand-innovation-green/10 text-center space-y-3 mb-6">
                <CheckCircle2 className="h-10 w-10 text-brand-innovation-green mx-auto" />
                <h4 className="text-lg font-bold font-heading text-theme-heading">
                  Enquiry Successfully Logged
                </h4>
                <p className="text-xs text-theme-body max-w-md mx-auto">
                  {statusMessage}
                </p>
                <div className="inline-block p-2 rounded-md bg-theme-surface border border-theme-border font-mono text-xs text-theme-heading">
                  Enquiry Reference: <strong className="text-brand-secondary">{enquiryId}</strong>
                </div>
                <p className="text-[11px] text-theme-muted">
                  Our academic coordinator will reach out via email and WhatsApp with the syllabus breakdown.
                </p>
                <Button
                  onClick={() => {
                    setFormStatus('idle');
                    setStatusMessage('');
                  }}
                  variant="secondary"
                  size="sm"
                >
                  Submit Another Course Enquiry
                </Button>
              </div>
            )}

            {/* Error Alert */}
            {formStatus === 'error' && (
              <div className="p-4 rounded-lg border border-red-500/40 bg-red-500/10 flex items-start gap-3 mb-6 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Form Validation Notice:</strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
            )}

            {formStatus !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-spam trap field */}
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
                  <FormField label="Full Name" htmlFor="courseFullName" required>
                    <Input
                      id="courseFullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ananya Sen"
                      required
                    />
                  </FormField>

                  <FormField label="Email Address" htmlFor="courseEmail" required>
                    <Input
                      id="courseEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ananya@college.edu"
                      required
                    />
                  </FormField>
                </div>

                {/* Phone & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Phone / WhatsApp Number" htmlFor="coursePhone" required>
                    <Input
                      id="coursePhone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      required
                    />
                  </FormField>

                  <FormField label="College / Institution" htmlFor="courseCollege" required>
                    <Input
                      id="courseCollege"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. BMS College of Engineering"
                      required
                    />
                  </FormField>
                </div>

                {/* Course Selection & Preferred Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Course of Interest" htmlFor="courseOfInterest" required>
                    <Select
                      id="courseOfInterest"
                      name="courseOfInterest"
                      value={formData.courseOfInterest}
                      onChange={handleInputChange}
                    >
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Learning Mode Preference" htmlFor="learningMode" required>
                    <Select
                      id="learningMode"
                      name="learningMode"
                      value={formData.learningMode}
                      onChange={handleInputChange}
                    >
                      <option value="Hybrid">Hybrid (Classroom Labs + Remote Sync)</option>
                      <option value="Classroom Hands-on">Classroom Hands-on (Bengaluru Lab)</option>
                      <option value="Online Live">Online Live Interactive (Kit Shipped)</option>
                    </Select>
                  </FormField>
                </div>

                {/* Message */}
                <FormField label="Message / Questions Regarding Syllabus or Schedule" htmlFor="courseMessage">
                  <Textarea
                    id="courseMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Ask about batch timings, kit shipment details, or group discounts..."
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
                      I understand this form generates an official course enquiry with HydroSync Innovations LLP and consent to receive syllabus documents and schedule updates via email, phone, or WhatsApp.
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
                    <span>Submit Course Enquiry</span>
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
