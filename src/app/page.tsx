import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Cpu,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Award,
  Layers,
  GraduationCap,
  Wrench,
  Building2,
  Calendar,
  Code2,
  Binary,
  Radio,
  School,
  ExternalLink,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/section-header';
import { ProjectCard } from '@/components/shared/project-card';
import { EventCard } from '@/components/shared/event-card';
import { TestimonialCard } from '@/components/shared/testimonial-card';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FEATURED_PROJECTS,
  UPCOMING_EVENTS,
  TESTIMONIALS,
} from '@/data/mock-data';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          SECTION 1 — HERO
          - Clear company positioning
          - Concise headline & one short supporting description
          - Primary CTA: Explore Our Programs, Secondary CTA: Contact Us
          - Relevant technical visual showing IoT, electronics, embedded systems
          - Balanced two-column desktop, clean mobile stack
         ========================================================================= */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (60% Desktop) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="iot">HydroSync Innovations LLP</Badge>
                <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
                  Technology • IoT • Embedded • AI
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-theme-heading leading-tight tracking-tight">
                Engineering Tomorrow&apos;s Connected Systems &amp; Technical Talent
              </h1>

              <p className="text-base sm:text-lg text-theme-body leading-relaxed max-w-2xl">
                HydroSync Innovations LLP operates in advanced technology, Internet of Things, Embedded Systems, Artificial Intelligence, technical training, internships, and industrial project development.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/courses" variant="primary" size="lg">
                  <span>Explore Our Programs</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Us
                </Button>
              </div>

              {/* Core Quality Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-theme-border/60 text-xs text-theme-body">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0" />
                  <span>Real Hardware Kits</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-secondary shrink-0" />
                  <span>Verified Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-primary dark:text-brand-dark-blue-accent shrink-0" />
                  <span>Institutional MoUs</span>
                </div>
              </div>
            </div>

            {/* Right Column (40% Desktop): Technical Visual (Embedded Systems & IoT) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-theme-border bg-brand-light-bg/70 dark:bg-brand-dark-surface p-6 sm:p-8 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-theme-border/80 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-brand-secondary" />
                    <span className="font-mono text-xs font-bold text-theme-heading uppercase tracking-wide">
                      HydroSync Embedded &amp; IoT Stack
                    </span>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-innovation-green animate-pulse" title="System Operational" />
                </div>

                {/* Architecture Layers */}
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-3.5 rounded-lg border border-theme-border bg-theme-surface shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted uppercase tracking-wider mb-1">
                      <span>Layer 01 &bull; Hardware &amp; Silicon</span>
                      <Radio className="h-3.5 w-3.5 text-brand-secondary" />
                    </div>
                    <div className="font-bold text-theme-heading text-xs sm:text-sm">
                      ARM Cortex-M &bull; STM32 &bull; ESP32 &bull; Custom PCB
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-theme-border bg-theme-surface shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted uppercase tracking-wider mb-1">
                      <span>Layer 02 &bull; Firmware &amp; Edge AI</span>
                      <Binary className="h-3.5 w-3.5 text-brand-secondary" />
                    </div>
                    <div className="font-bold text-theme-heading text-xs sm:text-sm">
                      FreeRTOS &bull; Bare-Metal C/C++ &bull; TinyML
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-theme-border bg-theme-surface shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted uppercase tracking-wider mb-1">
                      <span>Layer 03 &bull; Telemetry &amp; Cloud</span>
                      <Code2 className="h-3.5 w-3.5 text-brand-secondary" />
                    </div>
                    <div className="font-bold text-theme-heading text-xs sm:text-sm">
                      MQTT &bull; LoRaWAN Gateways &bull; AWS IoT Core
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between text-xs text-theme-muted">
                  <span>Operational Status: Active</span>
                  <span className="text-brand-secondary dark:text-brand-dark-blue-accent font-semibold font-sans">
                    Production Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2 — COMPANY HIGHLIGHTS
          - Display only verified achievements/specifications supplied by the client.
          - If specific numeric counters are unavailable, no numbers are fabricated.
         ========================================================================= */}
      <section className="py-10 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-dark-blue-accent block uppercase tracking-wider">
                Entity Status
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading mt-1 block">
                Registered LLP
              </span>
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Corporate Technology Enterprise
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-dark-blue-accent block uppercase tracking-wider">
                Laboratory Rigor
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading mt-1 block">
                Physical Workbenches
              </span>
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Test Instruments &amp; Development Boards
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-dark-blue-accent block uppercase tracking-wider">
                Training Model
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading mt-1 block">
                Hardware Kits Included
              </span>
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Real Microcontrollers &amp; Sensors
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-dark-blue-accent block uppercase tracking-wider">
                Academic Outreach
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading mt-1 block">
                College MoUs &amp; ATL
              </span>
              <span className="text-[11px] text-theme-muted mt-0.5 block">
                Center of Excellence Enablement
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — FOCUS AREAS
          - IoT
          - Embedded Systems
          - Artificial Intelligence
          - Technical Training
          - Project Development
          - Clean visual layout without excessive cards
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <SectionHeader
            eyebrow="Core Competencies"
            title="Our Primary Focus Areas"
            subtitle="HydroSync focuses strictly on high-rigor engineering domains connecting physical silicon with cloud intelligence."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {/* 1. IoT */}
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60 hover:bg-theme-surface hover:border-brand-secondary/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                  <Radio className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                  Internet of Things
                </h3>
                <p className="text-xs text-theme-body leading-relaxed">
                  Secure edge gateways, encrypted MQTT/CoAP telemetry, LoRaWAN protocols, and sensor cloud ingestion.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary">
                01 / TELEMETRY
              </span>
            </div>

            {/* 2. Embedded Systems */}
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60 hover:bg-theme-surface hover:border-brand-secondary/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                  Embedded Systems
                </h3>
                <p className="text-xs text-theme-body leading-relaxed">
                  Bare-metal C/C++, ARM Cortex-M, STM32 driver development, FreeRTOS scheduling, and PCB design.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary">
                02 / FIRMWARE
              </span>
            </div>

            {/* 3. Artificial Intelligence */}
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60 hover:bg-theme-surface hover:border-brand-secondary/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                  <Binary className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                  Artificial Intelligence
                </h3>
                <p className="text-xs text-theme-body leading-relaxed">
                  Edge computer vision, neural network quantization, and TinyML inference directly on microcontrollers.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary">
                03 / EDGE AI
              </span>
            </div>

            {/* 4. Technical Training */}
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60 hover:bg-theme-surface hover:border-brand-secondary/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                  Technical Training
                </h3>
                <p className="text-xs text-theme-body leading-relaxed">
                  Hands-on courses, intensive internships, and live masterclasses built around physical development kits.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary">
                04 / WORKFORCE
              </span>
            </div>

            {/* 5. Project Development */}
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60 hover:bg-theme-surface hover:border-brand-secondary/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-1.5">
                  Project Development
                </h3>
                <p className="text-xs text-theme-body leading-relaxed">
                  Commercial prototyping, custom electronics engineering, and college capstone technical guidance.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary">
                05 / R&amp;D LABS
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — WHAT WE OFFER
          - Technical Training (/courses)
          - Internships (/internships)
          - Courses (/courses)
          - Project Development (/projects)
          - Institutional Workshops (/for-colleges)
          - Each item links to its appropriate detail page
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Offerings Directory"
              title="What We Offer"
              subtitle="Structured programs tailored for aspiring engineers, educational institutions, and industrial clients."
              className="mb-0"
            />
            <Button href="/apply" variant="primary" size="sm" className="shrink-0 self-start md:self-auto">
              <span>Apply for Admissions</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Technical Training */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-sm hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="embedded">Training</Badge>
                  <GraduationCap className="h-4 w-4 text-theme-muted" />
                </div>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  Technical Training
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Structured skill acceleration tracks in bare-metal microcontroller programming, RTOS architecture, and industrial telemetry.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline pt-3 border-t border-theme-border/60"
              >
                <span>Explore Technical Training &rarr;</span>
              </Link>
            </div>

            {/* 2. Internships */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-sm hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="iot">Internships</Badge>
                  <Cpu className="h-4 w-4 text-theme-muted" />
                </div>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  Engineering Internships
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  1, 3, and 6-month hands-on internships with physical hardware dev kits, real problem statements, and academic project NOC support.
                </p>
              </div>
              <Link
                href="/internships"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline pt-3 border-t border-theme-border/60"
              >
                <span>Explore Internship Tracks &rarr;</span>
              </Link>
            </div>

            {/* 3. Courses */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-sm hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="ai">Curriculum</Badge>
                  <Layers className="h-4 w-4 text-theme-muted" />
                </div>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  Specialized Courses
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Modular technical courses covering ARM Cortex-M firmware, ESP32 FreeRTOS IoT systems, and TinyML edge vision models.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline pt-3 border-t border-theme-border/60"
              >
                <span>View Course Catalog &rarr;</span>
              </Link>
            </div>

            {/* 4. Project Development */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-sm hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="iot">Engineering</Badge>
                  <Wrench className="h-4 w-4 text-theme-muted" />
                </div>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  Project Development
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  End-to-end electronic hardware design, schematic capture, multi-layer PCB layout, firmware bring-up, and cloud telemetry integration.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline pt-3 border-t border-theme-border/60"
              >
                <span>Explore Project Portfolio &rarr;</span>
              </Link>
            </div>

            {/* 5. Institutional Workshops */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-sm hover:border-brand-secondary/60 transition-colors lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="success">Institutional</Badge>
                  <Building2 className="h-4 w-4 text-theme-muted" />
                </div>
                <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                  Institutional Workshops &amp; MoUs
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4 max-w-xl">
                  Turnkey Atal Tinkering Lab (ATL) setups for schools, and Center of Excellence (CoE) laboratory partnerships, Faculty Development Programs (FDPs), and on-campus hackathons for engineering colleges.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-theme-border/60">
                <Link
                  href="/for-colleges"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline"
                >
                  <span>For Colleges &amp; Universities &rarr;</span>
                </Link>
                <span className="text-theme-border">&bull;</span>
                <Link
                  href="/for-schools"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline"
                >
                  <span>For K-12 Schools (STEM / ATL) &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 — FEATURED PROJECTS
          - Selected projects with visual, title, concise description
          - Real client-supplied project information
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="R&amp;D Case Studies"
              title="Featured Industrial &amp; Engineering Projects"
              subtitle="Concrete hardware prototypes and telemetry solutions engineered by HydroSync teams and interns."
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

      {/* =========================================================================
          SECTION 6 — UPCOMING EVENTS
          - Display relevant upcoming events
          - Provide a useful empty state when no events are available
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Interactive Calendar"
              title="Upcoming Workshops &amp; Masterclasses"
              subtitle="Hands-on weekend laboratory sessions, microcontroller debugging clinics, and expert masterclasses."
              className="mb-0"
            />
            <Button href="/events" variant="secondary" size="sm" className="shrink-0 self-start md:self-auto">
              <span>View Full Calendar</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {UPCOMING_EVENTS && UPCOMING_EVENTS.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {UPCOMING_EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Public Events Scheduled This Week"
              description="New weekend workshops and hackathon dates are announced periodically. Explore our ongoing technical courses or contact us to arrange an on-campus event."
              icon={<Calendar className="h-6 w-6" />}
              actionLabel="Explore Technical Courses"
              actionHref="/courses"
            />
          )}
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7 — TESTIMONIALS
          - Genuine reviews from verified student alumni and institutional leads
          - Do not generate fictional student reviews
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <SectionHeader
            eyebrow="Verified Feedback"
            title="Institutional &amp; Alumni Reviews"
            subtitle="Authentic feedback from engineering students, academic heads, and school coordinators."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 — PARTNERS
          - Genuine partner categories & institutional reach
          - Do not use invented company logos
         ========================================================================= */}
      <section className="py-14 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
              Institutional Collaborations
            </span>
            <h3 className="text-lg font-bold font-heading text-theme-heading mt-1">
              Academic &amp; Technology Partnership Framework
            </h3>
            <p className="text-xs text-theme-body mt-1.5">
              HydroSync collaborates through verified institutional frameworks with universities and schools across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <Building2 className="h-6 w-6 text-brand-secondary mx-auto mb-2" />
              <span className="font-heading font-bold text-sm text-theme-heading block">
                Engineering Colleges
              </span>
              <span className="text-[11px] text-theme-muted mt-1 block">
                Memorandum of Understanding (MoU), IoT Centers of Excellence, and Faculty Development Programs (FDPs).
              </span>
            </div>

            <div className="p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <School className="h-6 w-6 text-brand-innovation-green mx-auto mb-2" />
              <span className="font-heading font-bold text-sm text-theme-heading block">
                K-12 School Networks
              </span>
              <span className="text-[11px] text-theme-muted mt-1 block">
                Turnkey Atal Tinkering Lab (ATL) setup, robotics hardware kits, and hands-on maker curricula.
              </span>
            </div>

            <div className="p-5 rounded-xl border border-theme-border bg-theme-surface text-center">
              <Wrench className="h-6 w-6 text-brand-primary dark:text-brand-dark-blue-accent mx-auto mb-2" />
              <span className="font-heading font-bold text-sm text-theme-heading block">
                Corporate Enterprises
              </span>
              <span className="text-[11px] text-theme-muted mt-1 block">
                Collaborative embedded firmware architecture, industrial sensor prototyping, and talent mentoring.
              </span>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline"
            >
              <span>Learn More About Partnership Models &rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9 — FINAL CTA
          - Clear enquiry or application action
         ========================================================================= */}
      <section className="py-16 md:py-20 bg-brand-primary dark:bg-brand-dark-surface text-white">
        <Container className="text-center max-w-3xl">
          <Badge variant="success" className="mb-4">
            Admissions &amp; Enquiries Active
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
            Ready to Engineer Connected Systems or Upskill Your Campus?
          </h2>
          <p className="mt-4 text-base text-white/85 leading-relaxed">
            Whether you are an engineering student seeking a hands-on hardware internship, a college department head planning an IoT lab, or a corporate client needing firmware prototyping, our team is ready to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/apply"
              variant="secondary"
              size="lg"
              className="bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-dark-blue-accent dark:text-brand-dark-bg font-bold shadow-md"
            >
              Apply for Admission
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Contact Directory
            </Button>
            <Button
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20HydroSync%2C%20I%20would%20like%20to%20enquire%20about%20your%20technical%20programs.`}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
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
