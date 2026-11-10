import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, CheckCircle2, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/section-header';
import { CourseCard } from '@/components/shared/course-card';
import { ProjectCard } from '@/components/shared/project-card';
import { EventCard } from '@/components/shared/event-card';
import { TestimonialCard } from '@/components/shared/testimonial-card';
import {
  FOCUS_AREAS,
  FEATURED_COURSES,
  FEATURED_PROJECTS,
  UPCOMING_EVENTS,
  TESTIMONIALS,
} from '@/data/mock-data';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 60% */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Badge variant="iot">Enterprise Engineering</Badge>
                <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  IoT • Embedded • Edge AI
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-theme-heading leading-tight tracking-tight">
                Engineering Tomorrow&apos;s Connected Systems &amp; Technical Talent
              </h1>

              <p className="text-base sm:text-lg text-theme-body leading-relaxed max-w-2xl">
                HydroSync Innovations LLP bridges production-grade technology development with high-impact technical workforce enablement. We deliver industrial IoT architectures, custom embedded firmware, and hands-on hardware internships.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/apply" variant="primary" size="lg">
                  <span>Explore Programs &amp; Apply</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Enterprise Services
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-theme-border/60 text-xs text-theme-body">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0" />
                  <span>Real Hardware Kits</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-secondary shrink-0" />
                  <span>Verified Certification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-primary dark:text-brand-dark-blue-accent shrink-0" />
                  <span>Institutional MoUs</span>
                </div>
              </div>
            </div>

            {/* Right 40%: Authentic Hardware Architecture Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-theme-border bg-brand-light-bg/60 dark:bg-brand-dark-surface p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-theme-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-brand-secondary" />
                    <span className="font-mono text-xs font-bold text-theme-heading uppercase tracking-wide">
                      HydroSync Core Stack
                    </span>
                  </div>
                  <span className="flex h-2 w-2 rounded-full bg-brand-innovation-green animate-pulse" />
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3 rounded-lg border border-theme-border bg-theme-surface">
                    <div className="text-[10px] text-theme-muted uppercase">Layer 01: Physical Hardware</div>
                    <div className="font-bold text-theme-heading mt-0.5">ARM Cortex-M &bull; STM32 &bull; ESP32 &bull; Custom PCB</div>
                  </div>

                  <div className="p-3 rounded-lg border border-theme-border bg-theme-surface">
                    <div className="text-[10px] text-theme-muted uppercase">Layer 02: Edge Firmware</div>
                    <div className="font-bold text-theme-heading mt-0.5">FreeRTOS &bull; Bare-Metal C/C++ &bull; TinyML</div>
                  </div>

                  <div className="p-3 rounded-lg border border-theme-border bg-theme-surface">
                    <div className="text-[10px] text-theme-muted uppercase">Layer 03: Telemetry &amp; Cloud</div>
                    <div className="font-bold text-theme-heading mt-0.5">MQTT Broker &bull; LoRaWAN Gateway &bull; AWS IoT Core</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between text-xs text-theme-muted">
                  <span>Standard: Production-Grade</span>
                  <span className="text-brand-secondary font-semibold font-sans">Lab Verified &bull; ISO Ready</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. KEY FOCUS VERTICALS */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Core Competencies"
            title="Strategic Technology &amp; Training Verticals"
            subtitle="Engineered for students, institutions, and industrial clients seeking high-rigor capabilities."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOCUS_AREAS.map((item) => (
              <div
                key={item.number}
                className="rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm hover:border-brand-secondary/60 transition-colors"
              >
                <span className="font-mono text-2xl font-extrabold text-brand-secondary/40 block mb-3">
                  {item.number}
                </span>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-theme-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. IMPORTANT SERVICES / PROGRAMS */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Curriculum &amp; Training"
              title="Flagship Technical Programs"
              subtitle="Industry-vetted programs with hands-on hardware development kits and verified certification."
              className="mb-0"
            />
            <Button href="/courses" variant="secondary" size="sm" className="shrink-0 self-start md:self-auto">
              <span>View All Courses</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. SELECTED PROJECTS */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="R&amp;D Showcase"
              title="Industrial Prototypes &amp; Deployments"
              subtitle="Case studies illustrating our embedded firmware design, edge AI inferencing, and IoT gateways."
              className="mb-0"
            />
            <Button href="/projects" variant="secondary" size="sm" className="shrink-0 self-start md:self-auto">
              <span>View All Projects</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. UPCOMING EVENTS & WORKSHOPS */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Interactive Sessions"
              title="Upcoming Workshops &amp; Masterclasses"
              subtitle="Deep-dive weekend sessions with live hardware debugging, protocol analyzers, and expert mentors."
              className="mb-0"
            />
            <Button href="/events" variant="secondary" size="sm" className="shrink-0 self-start md:self-auto">
              <span>View Full Calendar</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="space-y-4 max-w-4xl">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* 6. GENUINE TESTIMONIALS */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Social Proof"
            title="Institutional &amp; Student Feedback"
            subtitle="Verified reviews from alumni engineers, department heads, and school coordinators."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>

      {/* 7. ACADEMIC & CORPORATE PARTNERS (Controlled State) */}
      <section className="py-12 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
              Academic &amp; Institutional Collaborations
            </span>
            <h3 className="text-lg font-bold font-heading text-theme-heading mt-1">
              Trusted by Schools, Engineering Colleges &amp; Technology Labs
            </h3>
          </div>

          {/* Controlled State: Clean institutional badge strip while verified SVG logos are pending */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-theme-border bg-theme-bg/60 text-center">
              <span className="font-heading font-bold text-sm text-theme-heading">Engineering Colleges</span>
              <span className="text-[11px] text-theme-muted mt-0.5">MoUs &amp; Centers of Excellence</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-theme-border bg-theme-bg/60 text-center">
              <span className="font-heading font-bold text-sm text-theme-heading">K-12 School Networks</span>
              <span className="text-[11px] text-theme-muted mt-0.5">Atal Tinkering Labs (ATL)</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-theme-border bg-theme-bg/60 text-center">
              <span className="font-heading font-bold text-sm text-theme-heading">Corporate Clients</span>
              <span className="text-[11px] text-theme-muted mt-0.5">Custom IoT Firmware R&amp;D</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-theme-border bg-theme-bg/60 text-center">
              <span className="font-heading font-bold text-sm text-theme-heading">Alumni Placement</span>
              <span className="text-[11px] text-theme-muted mt-0.5">Core Hardware &amp; Embedded</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FINAL ENQUIRY CTA */}
      <section className="py-16 md:py-20 bg-brand-primary dark:bg-brand-dark-surface text-white">
        <Container className="text-center max-w-3xl">
          <Badge variant="success" className="mb-4">
            Admissions &amp; Partnerships Open
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
            Ready to Engineer Connected Systems or Upskill Your Campus?
          </h2>
          <p className="mt-4 text-base text-white/80 leading-relaxed">
            Whether you are an engineering student seeking a hands-on hardware internship, a college dean planning a Center of Excellence, or a school setting up an Atal Tinkering Lab, our team is ready to collaborate.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/apply"
              variant="secondary"
              size="lg"
              className="bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-dark-blue-accent dark:text-brand-dark-bg"
            >
              Submit Application
            </Button>
            <Button
              href="https://wa.me/919876543210?text=Hello%20HydroSync%2C%20I%20would%20like%20to%20enquire%20about%20your%20technical%20programs."
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

