import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  Target,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Building2,
  School,
  Wrench,
  GraduationCap,
  ArrowRight,
  Layers,
  FileText,
  Newspaper,
  Calendar,
  Users,
  Lightbulb,
} from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Us | HydroSync Innovations LLP',
  description:
    'Learn about HydroSync Innovations LLP, our journey, vision, mission, core values, operational capabilities, and institutional impact across IoT, Embedded Systems, and AI.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          SECTION 1 — PAGE HERO
          - Concise company introduction
          - Working links to Services, Team, and Contact
         ========================================================================= */}
      <PageHero
        eyebrow="Company Profile &amp; Identity"
        title="Engineering Hardware Rigor &amp; Technical Enablement"
        subtitle="HydroSync Innovations LLP operates in advanced technology, Internet of Things (IoT), Embedded Systems, Artificial Intelligence, technical training, internships, projects, and industrial innovation."
        breadcrumbs={[{ label: 'About Us' }]}
        actions={
          <>
            <Button href="/services" variant="primary">
              Explore Our Services
            </Button>
            <Button href="/team" variant="secondary">
              Meet Our Team
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Leadership
            </Button>
          </>
        }
      />

      {/* =========================================================================
          SECTION 2 — COMPANY OVERVIEW
          - Structured summary of corporate identity and dual operational model
         ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-heading text-theme-heading leading-[1.15] tracking-tight">
                An Engineering Enterprise Dedicated to Real Silicon, Scalable Telemetry &amp; Workforce Competence
              </h2>
              <p className="text-base text-theme-body leading-relaxed">
                HydroSync Innovations LLP is a specialized technology and technical education enterprise. We operate at the intersection of production-grade electronics engineering and practical workforce enablement.
              </p>
              <p className="text-base text-theme-body leading-relaxed">
                Rather than treating software in isolation, our work centers around physical computing: bare-metal microcontrollers, industrial printed circuit board (PCB) design, deterministic real-time operating systems (RTOS), low-power IoT telemetry, and edge artificial intelligence inferencing.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-2xl border border-theme-border bg-theme-bg shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-theme-border/80 pb-3">
                  <ShieldCheck className="h-5 w-5 text-brand-secondary" />
                  <span className="font-heading font-bold text-sm text-theme-heading">
                    Dual Operational Structure
                  </span>
                </div>
                <div className="space-y-3 text-xs text-theme-body leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <Wrench className="h-4 w-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-theme-heading block">Industrial R&amp;D &amp; Prototyping:</strong>
                      Custom firmware, multi-layer PCB design, sensor telemetry gateways, and edge vision systems for enterprises.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="h-4 w-4 text-brand-innovation-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-theme-heading block">Workforce &amp; Academic Enablement:</strong>
                      Hardware-kit-based internships, specialized courses, K-12 STEM ATL setups, and college Center of Excellence labs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — OUR STORY (Split Layout)
          - Editorial narrative with technical architecture graphic
         ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 Cols: Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-brand-secondary dark:text-brand-midnight-azure">
                Our Genesis
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold font-heading text-theme-heading leading-tight tracking-tight">
                Born From a Simple Engineering Reality: Simulation Is Not Enough
              </h2>
              <div className="space-y-3 text-sm text-theme-body leading-relaxed">
                <p>
                  HydroSync was founded by engineers who observed a persistent disparity in the technical workforce: while software abstraction continued to soar, foundational skills in physical electronics, register manipulation, and hardware debugging were rapidly diminishing.
                </p>
                <p>
                  Engineering graduates frequently understood high-level syntax but had never hooked up an oscilloscope to inspect an I2C clock glitch or configured FreeRTOS priority queues on ARM Cortex-M silicon.
                </p>
                <p>
                  We set out to build a platform that combines authentic commercial prototyping with rigorous, hardware-centric training. By delivering real development boards directly into the hands of students and partnering directly with institutional laboratories, we turned theoretical knowledge into tangible, test-bench verified capability.
                </p>
              </div>
            </div>

            {/* Right 6 Cols: Technical Architecture Diagram Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-theme-border pb-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-brand-secondary" />
                    <span className="font-mono text-xs font-bold text-theme-heading uppercase tracking-wide">
                      HydroSync Engineering Benchmark
                    </span>
                  </div>
                  <Badge variant="iot">Hardware Verified</Badge>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
                    <span className="text-[10px] text-theme-muted block uppercase">Focus Pillar 01</span>
                    <strong className="text-theme-heading text-xs sm:text-sm block mt-0.5">Physical Electronics &amp; Oscilloscopes</strong>
                    <span className="text-theme-muted text-[11px] block mt-0.5">Real signal integrity, logic analyzers, and component testing</span>
                  </div>

                  <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
                    <span className="text-[10px] text-theme-muted block uppercase">Focus Pillar 02</span>
                    <strong className="text-theme-heading text-xs sm:text-sm block mt-0.5">Deterministic Real-Time Firmware</strong>
                    <span className="text-theme-muted text-[11px] block mt-0.5">FreeRTOS task synchronization, DMA buffers, and bare-metal C/C++</span>
                  </div>

                  <div className="p-3 rounded-lg border border-theme-border bg-theme-bg/60">
                    <span className="text-[10px] text-theme-muted block uppercase">Focus Pillar 03</span>
                    <strong className="text-theme-heading text-xs sm:text-sm block mt-0.5">Edge AI &amp; Cloud Gateways</strong>
                    <span className="text-theme-muted text-[11px] block mt-0.5">TinyML model quantization, LoRaWAN mesh, and AWS IoT brokers</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-theme-border flex items-center justify-between text-xs text-theme-muted">
                  <span>Methodology: Test-Bench Driven</span>
                  <span className="text-brand-secondary font-semibold font-sans">Lab Bring-Up Standard</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — VISION AND MISSION
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vision */}
            <div className="p-8 rounded-2xl border border-theme-border bg-theme-bg/50 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-5">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                  Strategic Outlook
                </span>
                <h3 className="text-xl font-bold font-heading text-theme-heading mb-3">
                  Our Vision
                </h3>
                <p className="text-sm text-theme-body leading-relaxed">
                  To become a nationally respected technology and engineering enablement powerhouse, recognized for high-reliability industrial IoT solutions and a standard of technical training that produces genuinely capable hardware and firmware professionals.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-2xl border border-theme-border bg-theme-bg/50 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-innovation-green mb-5">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-innovation-green uppercase tracking-wider block mb-1">
                  Operational Mandate
                </span>
                <h3 className="text-xl font-bold font-heading text-theme-heading mb-3">
                  Our Mission
                </h3>
                <p className="text-sm text-theme-body leading-relaxed">
                  To bridge the divide between theoretical academic syllabi and production-grade engineering through physical hardware kits, transparent curriculum standards, verified industrial prototyping, and sustainable institutional partnerships.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 — CORE VALUES
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Ethical &amp; Engineering Foundation"
            title="Our Core Values"
            subtitle="The non-negotiable principles that guide every prototype we design and every student we mentor."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface shadow-xs">
              <span className="font-mono text-xs font-bold text-brand-secondary block mb-2">01 / RIGOR</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Hardware Truth</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Code that only works on a simulator is not finished. We test against real physical tolerance, electrical noise, and thermal constraints.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface shadow-xs">
              <span className="font-mono text-xs font-bold text-brand-secondary block mb-2">02 / INTEGRITY</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Verified Authenticity</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                We do not issue participation certificates without milestone defense, and we do not inflate achievements or publish fabricated metrics.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface shadow-xs">
              <span className="font-mono text-xs font-bold text-brand-secondary block mb-2">03 / EMPOWERMENT</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Institutional Uplift</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                We actively build capacity within schools and colleges through Faculty Development Programs and permanent Center of Excellence lab setups.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface shadow-xs">
              <span className="font-mono text-xs font-bold text-brand-secondary block mb-2">04 / INNOVATION</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Scalable Architecture</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Every IoT architecture and embedded system is engineered with commercial scalability, low-power duty cycles, and field reliability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 — WHY CHOOSE HYDROSYSNC
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <SectionHeader
            eyebrow="Key Differentiators"
            title="Why Choose HydroSync Innovations"
            subtitle="How our approach differs fundamentally from superficial online video vendors and theoretical academies."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <div className="h-10 w-10 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-brand-secondary mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                Physical Development Kits
              </h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Every enrolled candidate in our hardware tracks receives physical microcontrollers, sensors, and components. You wire, flash, and debug actual hardware.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <div className="h-10 w-10 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-brand-innovation-green mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                College Credit &amp; NOC Approvals
              </h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Our internship programs and capstone projects are structured to satisfy autonomous university rubrics, AICTE internship guidelines, and faculty approvals.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/60">
              <div className="h-10 w-10 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-brand-primary dark:text-brand-midnight-azure mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">
                End-to-End Spectrum
              </h3>
              <p className="text-xs text-theme-body leading-relaxed">
                We cover the entire lifecycle: from school STEM robotics (grades 6-12) to university Centers of Excellence to custom industrial prototype engineering for enterprises.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7 — COMPANY JOURNEY TIMELINE
          - Verified milestone progression only
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <SectionHeader
            eyebrow="Milestones"
            title="Our Verified Progression"
            subtitle="Key developmental phases in the growth of HydroSync Innovations LLP."
          />

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-mono text-xs font-bold dark:bg-brand-midnight-french dark:text-white">
                01
              </div>
              <div className="p-5 rounded-xl border border-theme-border bg-theme-surface flex-1">
                <span className="text-[11px] font-mono font-semibold text-brand-secondary block uppercase">
                  Foundation &bull; R&amp;D Specialization
                </span>
                <h3 className="text-base font-bold font-heading text-theme-heading mt-1">
                  Establishment of HydroSync Innovations LLP
                </h3>
                <p className="text-xs text-theme-body mt-2 leading-relaxed">
                  Formed with an explicit mandate to operate in Embedded Systems, Industrial IoT, and AI architectures, bridging software concepts with physical hardware.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-mono text-xs font-bold dark:bg-brand-midnight-french dark:text-white">
                02
              </div>
              <div className="p-5 rounded-xl border border-theme-border bg-theme-surface flex-1">
                <span className="text-[11px] font-mono font-semibold text-brand-secondary block uppercase">
                  Workforce Enablement &bull; Hardware Kits
                </span>
                <h3 className="text-base font-bold font-heading text-theme-heading mt-1">
                  Hands-On Hardware Internship Tracks
                </h3>
                <p className="text-xs text-theme-body mt-2 leading-relaxed">
                  Pioneered direct physical development kit dispatch for engineering interns, establishing register-level STM32 and ESP32 FreeRTOS project modules.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-mono text-xs font-bold dark:bg-brand-midnight-french dark:text-white">
                03
              </div>
              <div className="p-5 rounded-xl border border-theme-border bg-theme-surface flex-1">
                <span className="text-[11px] font-mono font-semibold text-brand-secondary block uppercase">
                  Institutional Partnerships &bull; MoUs
                </span>
                <h3 className="text-base font-bold font-heading text-theme-heading mt-1">
                  College Centers of Excellence &amp; School ATL Setup
                </h3>
                <p className="text-xs text-theme-body mt-2 leading-relaxed">
                  Formulated structured institutional collaboration agreements for university laboratories and turnkey Atal Tinkering Lab equipment for K-12 schools.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-mono text-xs font-bold dark:bg-brand-midnight-french dark:text-white">
                04
              </div>
              <div className="p-5 rounded-xl border border-theme-border bg-theme-surface flex-1">
                <span className="text-[11px] font-mono font-semibold text-brand-secondary block uppercase">
                  Edge AI &bull; Commercial Deployments
                </span>
                <h3 className="text-base font-bold font-heading text-theme-heading mt-1">
                  Industrial Telemetry &amp; TinyML Expansion
                </h3>
                <p className="text-xs text-theme-body mt-2 leading-relaxed">
                  Deployment of commercial LoRaWAN irrigation gateways, brushless DC motor controllers, and quantized computer vision defect detection systems.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 — OUR IMPACT
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-surface">
        <Container>
          <SectionHeader
            eyebrow="Tangible Outcomes"
            title="Our Institutional &amp; Technical Impact"
            subtitle="Qualitative and operational change delivered to students, faculties, and client engineering teams."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/50">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary block mb-1">
                For Students
              </span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Core Engineering Confidence</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Candidates gain concrete test-bench skills enabling them to discuss actual firmware architecture, register maps, and signal debugging in core interviews.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/50">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary block mb-1">
                For Colleges
              </span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Modernized Laboratories</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Transitioning academic electronics labs from legacy trainer kits to modern STM32, FreeRTOS, and AWS IoT cloud development environments.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/50">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary block mb-1">
                For Schools
              </span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Hands-on STEM Culture</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Cultivating curiosity in grades 6-12 through safe electronic kits, robotics challenges, and structured maker lab assignments.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border bg-theme-bg/50">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary block mb-1">
                For Industry
              </span>
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Rapid Prototyping</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Accelerating IoT product timelines from paper schematics to field-tested hardware sensor nodes ready for pilot deployment.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9 — AFFILIATIONS AND COLLABORATIONS
         ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure">
                Network &bull; Collaborations
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-theme-heading leading-tight">
                Institutional Partnerships Rooted in Mutual Value
              </h2>
              <p className="text-sm text-theme-body leading-relaxed">
                HydroSync collaborates with higher education institutions and school networks across multiple Indian states. Our institutional agreements are formal, accountable, and focused on long-term hardware capacity building.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/for-colleges" variant="secondary" size="sm">
                  College MoU Guidelines &rarr;
                </Button>
                <Button href="/for-schools" variant="secondary" size="sm">
                  School STEM / ATL Model &rarr;
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-7 rounded-2xl border border-theme-border bg-theme-surface shadow-xs space-y-4">
                <h3 className="text-base font-bold font-heading text-theme-heading border-b border-theme-border pb-3">
                  Engagement Modalities
                </h3>
                <ul className="space-y-3 text-xs text-theme-body">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0 mt-0.5" />
                    <span><strong>Center of Excellence MoUs:</strong> Turnkey laboratory infrastructure design, equipment calibration, and recurring student batches.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0 mt-0.5" />
                    <span><strong>Faculty Development Programs (FDPs):</strong> Intensive instructor training on register-level ARM programming and FreeRTOS.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-innovation-green shrink-0 mt-0.5" />
                    <span><strong>Atal Tinkering Labs Mentorship:</strong> Curriculum delivery, robotics equipment supply, and teacher guidance for K-12 schools.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 10 — COMPANY REGISTRATION INFORMATION
          - Strictly verified information; clearly marked placeholder for pending LLPIN
         ========================================================================= */}
      <section className="py-14 border-b border-theme-border bg-theme-surface">
        <Container>
          <div className="max-w-3xl mx-auto rounded-2xl border border-theme-border bg-theme-bg p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-4 border-b border-theme-border pb-3">
              <FileText className="h-5 w-5 text-brand-secondary" />
              <h3 className="text-base font-bold font-heading text-theme-heading">
                Corporate Registration &amp; Legal Profile
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-theme-muted block">Official Legal Name:</span>
                <strong className="text-theme-heading text-sm">{siteConfig.name}</strong>
              </div>
              <div>
                <span className="text-theme-muted block">Entity Constitution:</span>
                <strong className="text-theme-heading text-sm">Limited Liability Partnership (LLP)</strong>
              </div>
              <div>
                <span className="text-theme-muted block">Operating Verticals:</span>
                <span className="text-theme-heading font-medium">Technology, IoT, Embedded Systems, AI, Training &amp; Innovation</span>
              </div>
              <div>
                <span className="text-theme-muted block">LLPIN / Registration Number:</span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-theme-surface border border-theme-border text-theme-muted">
                  [LLPIN: To be updated upon official portal filing disclosure]
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-theme-muted block">Registered Facility &amp; Labs:</span>
                <span className="text-theme-heading font-medium">{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 11 — MEDIA COVERAGE
          - Controlled state / clearly marked placeholder per prompt rules
         ========================================================================= */}
      <section className="py-14 border-b border-theme-border bg-theme-bg">
        <Container>
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border border-dashed border-theme-border bg-theme-surface/70 text-center">
            <div className="h-10 w-10 rounded-full bg-brand-light-bg dark:bg-brand-dark-surface border border-theme-border flex items-center justify-center text-brand-secondary mx-auto mb-3">
              <Newspaper className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-theme-heading">
              Media &amp; Press Archive
            </h3>
            <p className="mt-2 text-xs text-theme-body leading-relaxed max-w-lg mx-auto">
              [Media Coverage: Official press releases, campus innovation symposium coverage, and technical seminar announcements are currently being archived. For media kits or editorial inquiries, contact our communications desk.]
            </p>
            <div className="mt-4">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Media%20and%20Press%20Enquiry`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary hover:underline"
              >
                <span>Inquire at {siteConfig.contact.email} &rarr;</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 12 — FINAL CTA (Explore Services / Contact Leadership)
         ========================================================================= */}
      <section className="py-16 md:py-20 bg-brand-primary dark:bg-brand-midnight-imperial text-white">
        <Container className="text-center max-w-3xl">
          <Badge variant="success" className="mb-4">
            Connect with HydroSync
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
            Ready to Collaborate with Our Engineering Team?
          </h2>
          <p className="mt-4 text-base text-white/85 leading-relaxed">
            Whether you want to explore industrial IoT services, discuss an institutional MoU for your campus, or join our hands-on engineering programs, we invite you to connect with us.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/services"
              variant="cta"
              size="lg"
              className="bg-white text-brand-primary hover:bg-slate-100 dark:bg-brand-midnight-yellow dark:text-[#101820] dark:hover:bg-brand-midnight-gold font-bold shadow-md"
            >
              Explore Services
            </Button>
            <Button
              href="/team"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Users className="mr-2 h-4 w-4" />
              Meet the Team
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
            >
              Contact Us &rarr;
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
