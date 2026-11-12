import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Cpu,
  Layers,
  Wrench,
  Code2,
  Binary,
  Radio,
  School,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/section-header';
import { COURSES_DATA } from '@/data/courses';
import { INTERNSHIP_PROGRAMS } from '@/data/internships';

export default function HomePage() {
  const featuredCourses = COURSES_DATA.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          SECTION 1 — HERO
          - Commanding Space Grotesk Display Headline (60–76px)
          - Single concise supporting statement
          - High-contrast primary CTA & secondary contact
          - Asymmetrical technical hardware stack visual with official mark
         ========================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg transition-colors">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column (60% Desktop) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-theme-border/80 dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface">
                <span className="flex h-2 w-2 rounded-full bg-brand-innovation-green animate-pulse" />
                <span className="font-mono text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure uppercase tracking-wider">
                  Technology • IoT • Embedded Systems • AI
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold font-heading text-theme-heading dark:text-brand-dark-heading leading-[1.08] tracking-tight">
                Engineering Tomorrow&apos;s Connected Silicon &amp; Technical Talent
              </h1>

              <p className="text-lg sm:text-xl text-theme-body dark:text-brand-dark-body leading-relaxed max-w-2xl font-normal">
                HydroSync Innovations LLP delivers physical computing rigor across industrial IoT, deterministic embedded firmware, edge artificial intelligence, and campus-wide innovation laboratories.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/courses" variant="cta" size="lg" className="h-12 px-7 text-sm font-bold">
                  <span>Explore Hardware Programs</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="h-12 px-7 text-sm font-semibold">
                  Contact Engineering Team
                </Button>
              </div>

              {/* Quality & Trust Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-theme-border/60 dark:border-brand-dark-border/60 text-xs text-theme-body dark:text-brand-dark-body">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block">
                    Workbench Standard
                  </span>
                  <strong className="text-theme-heading dark:text-brand-dark-heading font-semibold text-xs sm:text-sm block mt-1">
                    Real Hardware Kits
                  </strong>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block">
                    Institutional Tie-Ups
                  </span>
                  <strong className="text-theme-heading dark:text-brand-dark-heading font-semibold text-xs sm:text-sm block mt-1">
                    University MoUs
                  </strong>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block">
                    Corporate Entity
                  </span>
                  <strong className="text-theme-heading dark:text-brand-dark-heading font-semibold text-xs sm:text-sm block mt-1">
                    Registered LLP
                  </strong>
                </div>
              </div>
            </div>

            {/* Right Column (40% Desktop): Asymmetrical Hardware Stack Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface p-6 sm:p-8 shadow-md overflow-hidden">
                <div className="flex items-center justify-between border-b border-theme-border/80 dark:border-brand-dark-border/80 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/10 dark:bg-brand-dark-elevated p-1 border border-theme-border/60 dark:border-brand-dark-border/60 flex items-center justify-center">
                      <Image
                        src="/images/logo/hydrosync-logo-mark.png"
                        alt="HydroSync Emblem"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-theme-heading dark:text-brand-dark-heading uppercase tracking-wide block">
                        HydroSync Stack Architecture
                      </span>
                      <span className="text-[10px] text-theme-muted dark:text-brand-dark-muted block">
                        Hardware bring-up &amp; telemetry
                      </span>
                    </div>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-innovation-green" title="Operational" />
                </div>

                {/* Architecture Layers */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 01 • Silicon &amp; PCB</span>
                      <Radio className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      ARM Cortex-M • STM32 • ESP32 • Multi-Layer PCB
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 02 • Firmware &amp; Edge RTOS</span>
                      <Code2 className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      FreeRTOS Tasks • Bare-Metal C • TinyML Inference
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 03 • Telemetry &amp; Field Mesh</span>
                      <Binary className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      LoRaWAN • MQTT / TLS 1.3 • CAN Bus • RS-485
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-theme-muted dark:text-brand-dark-muted uppercase tracking-wider mb-1">
                      <span>Layer 04 • Cloud Intelligence</span>
                      <Layers className="h-3.5 w-3.5 text-brand-secondary dark:text-brand-midnight-azure" />
                    </div>
                    <div className="font-bold text-theme-heading dark:text-brand-dark-heading text-xs sm:text-sm">
                      AWS IoT Core • Time-Series Brokers • Dashboards
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-theme-border dark:border-brand-dark-border flex items-center justify-between text-xs text-theme-muted dark:text-brand-dark-muted">
                  <span>Standard: Test-Bench Verified</span>
                  <span className="text-brand-secondary dark:text-brand-midnight-azure font-semibold font-mono">
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2 — CATEGORY DISCOVERY (Intentional Asymmetrical Grid)
         ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg-alt transition-colors">
        <Container>
          <SectionHeader
            eyebrow="Category Discovery"
            title="Core Engineering Domains"
            subtitle="Explore our specialized hardware tracks, prototyping pipelines, and academic innovation centers."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Domain 1: Embedded Firmware (Wide 7 Cols) */}
            <div className="md:col-span-7 p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                  01 / SILICON &amp; FIRMWARE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Embedded Systems &amp; Real-Time OS
                </h3>
                <p className="text-sm sm:text-base text-theme-body dark:text-brand-dark-body leading-relaxed max-w-xl">
                  Direct register programming on ARM Cortex-M microcontrollers, FreeRTOS deterministic task scheduling, multi-channel DMA buffers, and low-power sleep state engineering.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    STM32 / ARM
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    FreeRTOS
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    Bare-Metal C
                  </span>
                </div>
              </div>
              <Link
                href="/courses"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-8 transition-colors"
              >
                <span>Browse Embedded Courses &amp; Kits</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Domain 2: Connected IoT Gateways (5 Cols) */}
            <div className="md:col-span-5 p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                  02 / TELEMETRY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Industrial IoT &amp; Telemetry
                </h3>
                <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Long-range LoRaWAN sensor nodes, encrypted MQTT telemetry over cellular and Wi-Fi, and real-time AWS IoT Core data ingestion.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    ESP32
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    LoRaWAN
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-theme-bg dark:bg-brand-dark-elevated text-theme-heading dark:text-brand-dark-heading border border-theme-border/60 dark:border-brand-dark-border/60">
                    MQTT
                  </span>
                </div>
              </div>
              <Link
                href="/internships"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary dark:hover:text-brand-midnight-gold mt-8 transition-colors"
              >
                <span>View IoT Internships</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Domain 3: Edge AI & Vision (4 Cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                  03 / INTELLIGENCE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Edge AI &amp; TinyML
                </h3>
                <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Quantized neural network execution on microcontrollers without continuous cloud reliance.
                </p>
              </div>
              <Link
                href="/services"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary mt-6 transition-colors"
              >
                <span>Explore Edge AI</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Domain 4: K-12 STEM Atal Tinkering Labs (4 Cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                  04 / K-12 STEM
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Atal Tinkering Labs
                </h3>
                <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Turnkey lab setup, equipment calibration, teacher training, and graded school robotics kits.
                </p>
              </div>
              <Link
                href="/for-schools"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary mt-6 transition-colors"
              >
                <span>School Partnerships</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Domain 5: College MoUs & CoE (4 Cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                  05 / INSTITUTIONAL
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                  Centers of Excellence
                </h3>
                <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                  Formal university MoUs, sponsored IoT testbenches, and faculty development clinics.
                </p>
              </div>
              <Link
                href="/for-colleges"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:text-brand-primary mt-6 transition-colors"
              >
                <span>University MoUs</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — FEATURED FLAGSHIP PROGRAMS
          - Information-rich course presentation with hardware kits
         ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure mb-3">
                Hardware Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-tight tracking-tight">
                Featured Engineering Programs
              </h2>
            </div>
            <Button href="/courses" variant="secondary" size="md">
              View All Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface p-7 sm:p-8 flex flex-col justify-between hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={course.category.includes('IoT') ? 'iot' : 'embedded'}>
                      {course.category}
                    </Badge>
                    <span className="font-mono text-xs font-semibold text-theme-muted dark:text-brand-dark-muted">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed line-clamp-3">
                    {course.shortDescription}
                  </p>

                  {/* Structured Hardware Strip */}
                  <div className="pt-3 border-t border-theme-border/60 dark:border-brand-dark-border/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted block mb-2">
                      Core Hardware Inclusions
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-innovation-green">
                      <Cpu className="h-4 w-4 shrink-0" />
                      <span>Physical Development Kit Included</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-theme-border/60 dark:border-brand-dark-border/60 flex items-center gap-3">
                  <Button
                    href="/courses"
                    variant="secondary"
                    size="sm"
                    className="w-1/2 text-xs font-semibold"
                  >
                    Syllabus
                  </Button>
                  <Button
                    href={`/apply?program=${encodeURIComponent(course.title)}`}
                    variant="cta"
                    size="sm"
                    className="w-1/2 text-xs font-semibold"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — INTERNSHIP IMMERSION
         ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg-alt transition-colors">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure">
                Workforce Development
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-heading text-theme-heading dark:text-brand-dark-heading leading-[1.14] tracking-tight">
                Structured Hardware Internships with Bench-Level Defense
              </h2>
              <p className="text-base text-theme-body dark:text-brand-dark-body leading-relaxed">
                Our internship programs reject purely simulated projects. Every candidate receives a verified development kit and completes structured milestones evaluated by senior hardware leads.
              </p>
              <div className="space-y-3 font-mono text-xs text-theme-heading dark:text-brand-dark-heading">
                <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface">
                  <span className="text-[10px] uppercase text-theme-muted dark:text-brand-dark-muted block">Duration Formats</span>
                  <span className="font-semibold block mt-0.5">1 Month (4 Wks) • 3 Months (12 Wks) • 6 Months (24 Wks)</span>
                </div>
                <div className="p-3.5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface">
                  <span className="text-[10px] uppercase text-theme-muted dark:text-brand-dark-muted block">Delivery Modes</span>
                  <span className="font-semibold text-brand-secondary dark:text-brand-midnight-azure block mt-0.5">
                    Classroom Hands-on • Hybrid Remote • Workbench
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <Button href="/internships" variant="cta" size="md">
                  <span>Explore All Internship Tracks</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {INTERNSHIP_PROGRAMS.slice(0, 2).map((internship) => (
                <div
                  key={internship.id}
                  className="p-7 sm:p-8 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="embedded">{internship.domain}</Badge>
                    <span className="text-xs font-mono text-brand-innovation-green font-semibold">
                      Hardware Dev Kit Included
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                    {internship.title}
                  </h3>
                  <p className="text-sm text-theme-body dark:text-brand-dark-body leading-relaxed">
                    {internship.summary}
                  </p>
                  <div className="pt-3 border-t border-theme-border/60 dark:border-brand-dark-border/60 flex items-center justify-between text-xs">
                    <span className="text-theme-muted dark:text-brand-dark-muted">
                      Kit: {internship.hardwareKit}
                    </span>
                    <Link
                      href="/apply"
                      className="font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:underline"
                    >
                      Apply for Track &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 — INSTITUTIONAL COLLABORATION
         ========================================================================= */}
      <section className="py-20 md:py-24 border-b border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-bg transition-colors">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure block">
              Institutional Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading tracking-tight">
              Academic &amp; Enterprise Partnerships
            </h2>
            <p className="text-base text-theme-body dark:text-brand-dark-body leading-relaxed">
              HydroSync Innovation Labs executes formal institutional MoUs, establishing on-premise IoT Centers of Excellence, lab calibration, and university-aligned curriculum delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface text-center space-y-2">
              <School className="h-8 w-8 text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-theme-heading dark:text-brand-dark-heading">K-12 STEM ATL Labs</h3>
              <p className="text-xs text-theme-muted dark:text-brand-dark-muted leading-relaxed">Turnkey instrumentation and structured robotics packages</p>
            </div>
            <div className="p-6 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface text-center space-y-2">
              <Building2 className="h-8 w-8 text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-theme-heading dark:text-brand-dark-heading">College MoUs</h3>
              <p className="text-xs text-theme-muted dark:text-brand-dark-muted leading-relaxed">Dedicated Centers of Excellence and student capstones</p>
            </div>
            <div className="p-6 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-surface text-center space-y-2">
              <Wrench className="h-8 w-8 text-brand-primary dark:text-brand-midnight-azure mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-theme-heading dark:text-brand-dark-heading">Faculty FDP Clinics</h3>
              <p className="text-xs text-theme-muted dark:text-brand-dark-muted leading-relaxed">Advanced embedded firmware and TinyML faculty training</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary dark:text-brand-midnight-azure hover:underline"
            >
              <span>Explore Full Institutional Partnership Models &rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 — FINAL CTA (Deep Imperial Blue Section with Gold/Yellow Action)
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-primary dark:bg-brand-midnight-imperial text-white transition-colors">
        <Container className="text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-brand-midnight-yellow" />
            <span>Admissions &amp; Enquiries Open</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Ready to Engineer Connected Systems or Upskill Your Campus?
          </h2>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
            Whether you are an engineering student seeking a hands-on hardware internship, a college department head planning an IoT lab, or an enterprise client needing custom electronics prototyping.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/apply"
              variant="cta"
              size="lg"
              className="h-12 px-7 bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-midnight-yellow dark:text-[#101820] dark:hover:bg-brand-midnight-gold font-bold shadow-md text-sm"
            >
              Apply for Admission
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="h-12 px-7 border-white/40 text-white hover:bg-white/10 dark:border-white/40 dark:text-white dark:hover:bg-white/10 text-sm font-semibold"
            >
              Contact Directory
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}