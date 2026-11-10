import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
  GraduationCap,
  Wrench,
  Building2,
  Code2,
  Binary,
  Radio,
  School,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/section-header';
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
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (60% Desktop) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="iot">HydroSync Innovations LLP</Badge>
                <span className="text-xs font-semibold text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider">
                  Technology • IoT • Embedded • AI
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-theme-heading dark:text-brand-dark-heading leading-tight tracking-tight">
                Engineering Tomorrow&apos;s Connected Systems &amp; Technical Talent
              </h1>

              <p className="text-base sm:text-lg text-theme-body dark:text-brand-dark-body leading-relaxed max-w-2xl">
                HydroSync Innovations LLP operates in advanced technology, Internet of Things, Embedded Systems, Artificial Intelligence, technical training, internships, and industrial project development.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/courses" variant="cta" size="lg">
                  <span>Explore Our Programs</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Us
                </Button>
              </div>

              {/* Core Quality Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-theme-border/60 dark:border-brand-dark-border/60 text-xs text-theme-body dark:text-brand-dark-body">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0" />
                  <span>Real Hardware Kits</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-secondary dark:text-brand-midnight-azure shrink-0" />
                  <span>Verified Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-primary dark:text-brand-midnight-azure shrink-0" />
                  <span>Institutional MoUs</span>
                </div>
              </div>
            </div>

            {/* Right Column (40% Desktop): Technical Visual (Embedded Systems & IoT) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-theme-border dark:border-brand-dark-border bg-brand-light-bg/70 dark:bg-brand-dark-surface p-6 sm:p-8 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-theme-border/80 dark:border-brand-dark-border/80 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-brand-secondary dark:text-brand-midnight-azure" />
                    <span className="font-mono text-xs font-bold text-theme-heading dark:text-brand-dark-heading uppercase tracking-wide">
                      HydroSync Embedded &amp; IoT Stack
                    </span>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-innovation-green animate-pulse" title="System Operational" />
                </div>

                {/* Architecture Layers */}
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-3.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 01 &bull; Hardware &amp; Silicon</span>
                      <Radio className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      ARM Cortex-M &bull; STM32 &bull; ESP32 &bull; Custom PCB
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 02 &bull; Firmware &amp; Edge RTOS</span>
                      <Code2 className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      FreeRTOS &bull; Bare-Metal C &bull; TinyML Inference
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 03 &bull; Protocols &amp; Telemetry</span>
                      <Binary className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      MQTT &bull; CoAP &bull; LoRaWAN &bull; TLS 1.3
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 04 &bull; Cloud Intelligence &amp; Ingestion</span>
                      <Layers className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      Time-Series Analytics &bull; Webhook Dispatch
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-theme-border dark:border-brand-dark-border flex items-center justify-between text-xs text-theme-muted dark:text-brand-dark-muted">
                  <span>Operational Status: Active</span>
                  <span className="text-brand-secondary dark:text-brand-midnight-azure font-semibold font-sans">
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
          - Operational model specifications verified by the company brief.
         ========================================================================= */}
      <section className="py-10 border-b border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg-alt">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-midnight-azure block uppercase tracking-wider">
                Entity Status
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading mt-1 block">
                Registered LLP
              </span>
              <span className="text-[11px] text-theme-muted dark:text-brand-dark-muted mt-0.5 block">
                Corporate Technology Enterprise
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-midnight-azure block uppercase tracking-wider">
                Laboratory Rigor
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading mt-1 block">
                Physical Workbenches
              </span>
              <span className="text-[11px] text-theme-muted dark:text-brand-dark-muted mt-0.5 block">
                Test Instruments &amp; Development Boards
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-midnight-azure block uppercase tracking-wider">
                Training Model
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading mt-1 block">
                Hardware Kits Included
              </span>
              <span className="text-[11px] text-theme-muted dark:text-brand-dark-muted mt-0.5 block">
                Real Microcontrollers &amp; Sensors
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary dark:text-brand-midnight-azure block uppercase tracking-wider">
                Academic Outreach
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading mt-1 block">
                College MoUs &amp; ATL
              </span>
              <span className="text-[11px] text-theme-muted dark:text-brand-dark-muted mt-0.5 block">
                Center of Excellence Enablement
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — FOCUS AREAS
          - IoT, Embedded Systems, AI, Technical Training, Project Development
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg">
        <Container>
          <SectionHeader
            eyebrow="Core Competencies"
            title="Our Primary Focus Areas"
            subtitle="HydroSync focuses strictly on high-rigor engineering domains connecting physical silicon with cloud intelligence."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {/* 1. IoT */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-bg/60 dark:bg-brand-dark-surface hover:bg-theme-surface dark:hover:bg-brand-dark-elevated hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                  <Radio className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                  Internet of Things
                </h3>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Secure edge gateways, encrypted MQTT/CoAP telemetry, LoRaWAN protocols, and sensor cloud ingestion.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                01 / TELEMETRY
              </span>
            </div>

            {/* 2. Embedded Systems */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-bg/60 dark:bg-brand-dark-surface hover:bg-theme-surface dark:hover:bg-brand-dark-elevated hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                  Embedded Systems
                </h3>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Bare-metal C/C++, ARM Cortex-M, STM32 driver development, FreeRTOS scheduling, and PCB design.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                02 / FIRMWARE
              </span>
            </div>

            {/* 3. Artificial Intelligence */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-bg/60 dark:bg-brand-dark-surface hover:bg-theme-surface dark:hover:bg-brand-dark-elevated hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                  <Binary className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                  Artificial Intelligence
                </h3>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Edge computer vision, neural network quantization, and TinyML inference directly on microcontrollers.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                03 / EDGE AI
              </span>
            </div>

            {/* 4. Technical Training */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-bg/60 dark:bg-brand-dark-surface hover:bg-theme-surface dark:hover:bg-brand-dark-elevated hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                  Technical Training
                </h3>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Hands-on courses, intensive internships, and live masterclasses built around physical development kits.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                04 / WORKFORCE
              </span>
            </div>

            {/* 5. Project Development */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-bg/60 dark:bg-brand-dark-surface hover:bg-theme-surface dark:hover:bg-brand-dark-elevated hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-colors flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                  Project Development
                </h3>
                <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Commercial prototyping, custom electronics engineering, and college capstone technical guidance.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                05 / R&amp;D LABS
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — WHAT WE OFFER
          - Core service offerings aligned with verified brief
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Solutions Directory"
            title="What We Offer"
            subtitle="Explore our comprehensive services across workforce training, industrial development, and institutional enablement."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="iot">Career Acceleration</Badge>
                <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Technical Training &amp; Bootcamps
                </h3>
                <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Industry-aligned curriculum covering Embedded C, ARM architecture, ESP32 RTOS, and Edge AI inference with dedicated workbench access.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-6 transition-colors"
              >
                <span>Browse Technical Courses</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="embedded">Hands-On Immersion</Badge>
                <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Engineering Internship Programs
                </h3>
                <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Structured 4 to 24-week online &amp; offline internship tracks in IoT, Embedded Firmware, and Edge AI backed by physical hardware development boards.
                </p>
              </div>
              <Link
                href="/internships"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-6 transition-colors"
              >
                <span>View Internship Tracks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="ai">Industrial Engineering</Badge>
                <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Project Development &amp; Prototyping
                </h3>
                <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  End-to-end electronic hardware design, schematic layout, PCB fabrication, and firmware bring-up for commercial and capstone projects.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-6 transition-colors"
              >
                <span>Explore Technical Services</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="success">School STEM Enablement</Badge>
                <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  School Atal Tinkering Labs (ATL)
                </h3>
                <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Turnkey lab setup, equipment calibration, teacher upskilling workshops, and year-round STEM robotics curriculum mapped to national guidelines.
                </p>
              </div>
              <Link
                href="/for-schools"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-6 transition-colors"
              >
                <span>Partner with Schools</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="embedded">Higher Education</Badge>
                <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  College MoUs &amp; Centres of Excellence
                </h3>
                <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Formal institutional tie-ups, IoT CoE lab infrastructure, faculty development programs (FDPs), and sponsored student capstone evaluation.
                </p>
              </div>
              <Link
                href="/for-colleges"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-6 transition-colors"
              >
                <span>College Partnerships</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 6: Comprehensive Services Link */}
            <div className="p-6 rounded-xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/50 dark:bg-brand-dark-elevated flex flex-col items-center justify-center text-center">
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-2">
                Need a Custom Technology Solution?
              </h3>
              <p className="text-xs text-theme-muted dark:text-brand-dark-muted mb-4 max-w-xs">
                We design specialized sensor arrays, industrial firmware drivers, and turn-key hardware training modules.
              </p>
              <Button href="/services" variant="secondary" size="sm">
                View All 10 Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 — INSTITUTIONAL COLLABORATION STRIP
         ========================================================================= */}
      <section className="py-12 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block mb-3">
              Institutional Partnership Framework
            </span>
            <p className="text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed mb-6">
              HydroSync Innovation Labs partners with academic institutions through structured MoUs, establishing on-premise IoT Centers of Excellence, laboratory hardware calibration, and university-aligned curriculum delivery.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-theme-heading dark:text-brand-dark-heading max-w-lg mx-auto">
              <div className="p-3 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface">
                <School className="h-6 w-6 text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-2" />
                <span>K-12 STEM ATL Labs</span>
              </div>
              <div className="p-3 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface">
                <Building2 className="h-6 w-6 text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-2" />
                <span>College MoUs</span>
              </div>
              <div className="p-3 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface col-span-2 sm:col-span-1">
                <Wrench className="h-6 w-6 text-brand-primary dark:text-brand-midnight-azure mx-auto mb-2" />
                <span>Faculty FDP Clinics</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:underline"
            >
              <span>Learn More About Partnership Models &rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 — FINAL CTA (Deep Imperial Blue Section with Gold/Yellow CTA)
         ========================================================================= */}
      <section className="py-16 md:py-20 bg-brand-primary dark:bg-brand-midnight-imperial text-white transition-colors">
        <Container className="text-center max-w-3xl">
          <Badge variant="success" className="mb-4">
            Admissions &amp; Enquiries Active
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
            Ready to Engineer Connected Systems or Upskill Your Campus?
          </h2>
          <p className="mt-4 text-base text-white/85 leading-relaxed">
            Whether you are an engineering student seeking a hands-on hardware internship, a college department head planning an IoT lab, or an enterprise client needing custom electronics prototyping, our team is ready to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/apply"
              variant="cta"
              size="lg"
              className="bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-midnight-yellow dark:text-[#101820] dark:hover:bg-brand-midnight-gold font-bold shadow-md"
            >
              Apply for Admission
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 dark:border-white/40 dark:text-white dark:hover:bg-white/10"
            >
              Contact Directory
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
