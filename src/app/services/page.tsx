import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Cpu,
  Wrench,
  Compass,
  Radio,
  Layers,
  Binary,
  School,
  Building2,
  Package,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Services & Technical Offerings | HydroSync Innovations LLP',
  description:
    'Explore the 10 core offerings of HydroSync Innovations LLP across Technical Training, Internships, R&D, Prototyping, Hardware Kits, Institutional Workshops, and IoT/AI Solutions.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          1. PAGE HERO & INTRODUCTION
         ========================================================================= */}
      <PageHero
        eyebrow="Commercial &amp; Educational Offerings"
        title="Comprehensive Technology Services &amp; Training Programs"
        subtitle="From prototype hardware bring-up and industrial IoT architectures to hands-on engineering internships and school STEM laboratories."
        breadcrumbs={[{ label: 'Services' }]}
        actions={
          <>
            <Button href="/contact" variant="primary">
              Submit Service Enquiry
            </Button>
            <Button href="/apply" variant="secondary">
              Apply for Admissions
            </Button>
          </>
        }
      />

      {/* =========================================================================
          2. SERVICE OVERVIEW & THREE MAIN CATEGORIES
         ========================================================================= */}
      <section className="py-12 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-theme-border bg-theme-bg/60 text-left">
              <div className="flex items-center gap-2 mb-2 text-brand-secondary">
                <GraduationCap className="h-5 w-5" />
                <span className="font-heading font-bold text-sm text-theme-heading">
                  1. Workforce &amp; Academic Programs
                </span>
              </div>
              <p className="text-xs text-theme-body leading-relaxed">
                Technical training, hardware internships, turnkey product kits, and K-12/College institutional workshops.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-theme-border bg-theme-bg/60 text-left">
              <div className="flex items-center gap-2 mb-2 text-brand-primary dark:text-brand-midnight-azure">
                <Wrench className="h-5 w-5" />
                <span className="font-heading font-bold text-sm text-theme-heading">
                  2. Industrial R&amp;D &amp; Prototyping
                </span>
              </div>
              <p className="text-xs text-theme-body leading-relaxed">
                Schematic capture, multi-layer PCB design, experimental R&amp;D, and rapid hardware proof-of-concept fabrication.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-theme-border bg-theme-bg/60 text-left">
              <div className="flex items-center gap-2 mb-2 text-brand-innovation-green">
                <Radio className="h-5 w-5" />
                <span className="font-heading font-bold text-sm text-theme-heading">
                  3. Enterprise Solutions &amp; Consulting
                </span>
              </div>
              <p className="text-xs text-theme-body leading-relaxed">
                Bespoke technology modules, architecture audits, and full-stack IoT gateways paired with TinyML vision systems.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CATEGORY 1: TECHNICAL EDUCATION, INTERNSHIPS & INSTITUTIONAL
          - 1. Technical Training
          - 2. Internship Programs
          - 8. Product Kits
          - 9. School and College Workshops
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Category 01"
            title="Technical Education &amp; Institutional Enablement"
            subtitle="Hands-on skills development with physical hardware kits, verified curriculum milestones, and academic MoUs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SERVICE 1: Technical Training */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="embedded">Training</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-01</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  1. Technical Training
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Structured classroom and live interactive training in bare-metal C/C++, ARM Cortex-M firmware, and FreeRTOS task scheduling.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Engineering undergraduates (ECE, EEE, CS), polytechnic diploma students, and junior developers.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Upcoming batch schedules, course syllabi, prerequisite checks, and enrollment fees.
                  </div>
                </div>
              </div>

              <Button
                href="/courses"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>View Training Syllabi &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 2: Internship Programs */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="iot">Internships</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-02</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  2. Internship Programs
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  1, 3, and 6-month hands-on internships with physical hardware dev kits, real problem statements, and academic evaluations.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    2nd, 3rd, and 4th-year engineering students requiring major/minor capstone project credits.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Track selection (Embedded, IoT, TinyML), college NOC approvals, and start dates.
                  </div>
                </div>
              </div>

              <Button
                href="/internships"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Explore Internship Tracks &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 8: Product Kits */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="neutral">Hardware Kits</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-08</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  8. Product Kits
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Turnkey hardware development packages containing microcontrollers (ESP32, STM32), breakout sensors, and test breadboards.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Individual student experimenters, electronics hobbyists, college labs, and school STEM makers.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Kit component manifests, microcontroller variants, lab manuals, and bulk institutional kits.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Product%20Kits"
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Enquire on Hardware Kits &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 9: School and College Workshops */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="success">Institutional</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-09</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  9. School &amp; College Workshops
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Turnkey Atal Tinkering Lab (ATL) mentorship for K-12 schools, and on-campus hackathons and CoE lab setup for colleges.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    School principals, STEM coordinators, college deans, HoDs, and university academic directors.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Institutional MoUs, lab workbench installation, teacher training, and symposium packages.
                  </div>
                </div>
              </div>

              <Button
                href="/for-colleges"
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Explore Campus MoUs &rarr;</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CATEGORY 2: INDUSTRIAL ENGINEERING, PROTOTYPING & R&D
          - 3. Project Development
          - 4. Research and Development
          - 5. Prototyping
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                Category 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-theme-heading leading-tight">
                Industrial Engineering, R&amp;D &amp; Rapid Prototyping
              </h2>
              <p className="text-sm text-theme-body leading-relaxed">
                We take electronic concepts from initial paper schematics through board bring-up, multi-layer layout, firmware driver implementation, and laboratory field-testing.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-5 rounded-xl border border-theme-border bg-theme-bg/60 text-xs text-theme-body space-y-2">
                <div className="flex items-center gap-2 text-theme-heading font-semibold font-mono">
                  <Zap className="h-4 w-4 text-brand-secondary" />
                  <span>Hardware Prototyping Capabilities</span>
                </div>
                <p className="text-theme-muted text-[11px]">
                  Schematic Capture &bull; Multi-Layer PCB Layout &bull; Low-Power Optimization &bull; SMD Soldering Inspection &bull; Oscilloscope Waveform Verification
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SERVICE 3: Project Development */}
            <div className="rounded-xl border border-theme-border bg-theme-bg/50 p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="iot">Engineering</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-03</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  3. Project Development
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Full-cycle electronics product development covering circuit design, multi-layer PCB routing, firmware bring-up, and sensor integration.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Startups, automation teams, and final-year student teams requiring advanced engineering guidance.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Technical feasibility, circuit design, bill of materials (BOM) optimization, and project milestones.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Project%20Development"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Discuss Project Scope &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 4: Research and Development (R&D) */}
            <div className="rounded-xl border border-theme-border bg-theme-bg/50 p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="ai">R&amp;D</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-04</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  4. Research &amp; Development
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Applied engineering exploration into low-power sensor networks, novel microcontroller topologies, and deterministic edge signal processing.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Enterprise innovation units, clean-tech organizations, and specialized academic research laboratories.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Sensor feasibility studies, experimental telemetry protocols, and test-bench validation.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Research%20and%20Development"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Initiate R&amp;D Consultation &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 5: Prototyping */}
            <div className="rounded-xl border border-theme-border bg-theme-bg/50 p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="neutral">Rapid PoC</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-05</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  5. Prototyping
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Rapid proof-of-concept hardware fabrication, breadboard-to-PCB translation, SMD assembly inspection, and functional verification.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Hardware innovators, early-stage ventures, and engineering teams needing fast functional models.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Turnaround timelines, component availability, breadboard verification, and pilot assembly.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Prototyping"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Request Prototype Quote &rarr;</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CATEGORY 3: ENTERPRISE SOLUTIONS, CONSULTANCY & IOT/AI
          - 6. Consultancy Services
          - 7. Custom Technology Solutions
          - 10. IoT and AI Solutions
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Category 03"
            title="Enterprise Solutions, Consulting &amp; IoT/AI"
            subtitle="Advisory and implementation services for organizations deploying connected field devices and intelligent edge systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SERVICE 6: Consultancy Services */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="neutral">Advisory</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-06</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  6. Consultancy Services
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Technical advisory on microcontroller selection, firmware architecture reviews, low-power profiling, and laboratory bench setup.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Corporate engineering managers, university curriculum chairs, and hardware startup founders.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Architecture audits, component obsolescence reviews, BOM cost optimization, and lab design.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Consultancy%20Services"
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Book Advisory Session &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 7: Custom Technology Solutions */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="iot">Custom Design</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-07</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  7. Custom Technology Solutions
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Bespoke electronic interface boards, custom industrial data loggers, and specialized telemetry gateways tailored to unique use-cases.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Industrial clients with legacy machinery, agricultural automation, and specialized sensor requirements.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Custom hardware specifications, environmental enclosure requirements, and system integration.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=Custom%20Technology%20Solutions"
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Inquire on Custom Solution &rarr;</span>
              </Button>
            </div>

            {/* SERVICE 10: IoT and AI Solutions */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 flex flex-col justify-between shadow-xs hover:border-brand-secondary/60 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="ai">IoT &amp; AI</Badge>
                  <span className="text-[10px] font-mono font-bold text-theme-muted">SVC-10</span>
                </div>
                <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                  10. IoT &amp; AI Solutions
                </h3>
                <p className="text-xs text-theme-body leading-relaxed mb-4">
                  Full-stack industrial IoT telemetry (LoRaWAN, MQTT, cellular) integrated with edge computer vision and TinyML classifiers on microcontrollers.
                </p>

                <div className="space-y-2 pt-3 border-t border-theme-border/60 text-[11px] text-theme-muted mb-6">
                  <div>
                    <strong className="text-theme-heading block">Intended For:</strong>
                    Manufacturing facilities, agricultural telemetry networks, and remote condition monitoring teams.
                  </div>
                  <div>
                    <strong className="text-theme-heading block">Enquiry Scope:</strong>
                    Sensor telemetry range, edge model inferencing, cloud dashboards, and gateway hardware specs.
                  </div>
                </div>
              </div>

              <Button
                href="/contact?service=IoT%20and%20AI%20Solutions"
                variant="primary"
                size="sm"
                className="w-full text-xs"
              >
                <span>Explore IoT &amp; AI Solutions &rarr;</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          FINAL CONTACT & SERVICE ENQUIRY CTA
         ========================================================================= */}
      <section className="py-16 md:py-20 bg-brand-primary dark:bg-brand-midnight-imperial text-white">
        <Container className="text-center max-w-3xl">
          <Badge variant="success" className="mb-4">
            Custom Inquiries Welcome
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
            Have a Specific Engineering or Training Requirement?
          </h2>
          <p className="mt-4 text-base text-white/85 leading-relaxed">
            Whether you need a custom IoT prototype developed, a specialized hardware training curriculum for your institution, or technical consulting, our engineering team is here to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="cta"
              size="lg"
              className="bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-midnight-yellow dark:text-[#101820] dark:hover:bg-brand-midnight-gold font-bold shadow-md"
            >
              Contact Our Engineers
            </Button>
            <Button
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20HydroSync%2C%20I%20have%20an%20enquiry%20regarding%20your%20services.`}
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Chat on WhatsApp &rarr;
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
