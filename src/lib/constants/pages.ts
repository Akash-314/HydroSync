export interface PageMetadata {
  slug: string;
  name: string;
  path: string;
  desc: string;
}

export const ALL_PAGES: PageMetadata[] = [
  { slug: 'home', name: 'Home Page', path: '/', desc: 'Hero headline, domain grid, features, CTA banner' },
  { slug: 'about', name: 'About Us', path: '/about', desc: 'Company vision, origins, leadership philosophy' },
  { slug: 'services', name: 'Engineering Services', path: '/services', desc: 'R&D consulting, turnkey firmware, PCB bring-up' },
  { slug: 'internships', name: 'Internship Programs', path: '/internships', desc: 'Hardware cohort tracks, curriculum, lab benefits' },
  { slug: 'courses', name: 'Technical Training', path: '/courses', desc: 'Microcontroller, FreeRTOS, and Edge AI course offerings' },
  { slug: 'events', name: 'Workshops & Events', path: '/events', desc: 'Masterclasses, technical bootcamps, and live sessions' },
  { slug: 'projects', name: 'Project Showcase', path: '/projects', desc: 'Case studies, telemetry systems, and field deployments' },
  { slug: 'team', name: 'Engineering Team', path: '/team', desc: 'Leadership directory, bios, and domain specializations' },
  { slug: 'contact', name: 'Contact Directory', path: '/contact', desc: 'Headquarters, lab address, admissions hotline, map' },
  { slug: 'for-schools', name: 'For Schools & ATLs', path: '/for-schools', desc: 'Atal Tinkering Labs, STEM curriculum, robotics kits' },
  { slug: 'for-colleges', name: 'For Colleges & Universities', path: '/for-colleges', desc: 'Institutional MoUs, Centres of Excellence, FDPs' },
  { slug: 'live-classes', name: 'Live Classes & Masterclasses', path: '/live-classes', desc: 'Live studio streaming, real-time lab workbench feeds' },
  { slug: 'gallery', name: 'Hardware & Lab Gallery', path: '/gallery', desc: 'Visual archive of lab facilities and campus deliveries' },
  { slug: 'faq', name: 'Frequently Asked Questions', path: '/faq', desc: 'Admissions, eligibility, kits, and certificate queries' },
  { slug: 'testimonials', name: 'Student Reviews', path: '/testimonials', desc: 'Student reviews, alumni placements, university feedback' },
  { slug: 'hardware-kits', name: 'Hardware Workbench Kits', path: '/hardware-kits', desc: 'Workbench kits, oscilloscope specs, and delivery specs' },
  { slug: 'curriculum', name: 'Curriculum Standards', path: '/curriculum', desc: 'Syllabus standards, industrial alignment, grading' },
  { slug: 'blog', name: 'Technical Articles', path: '/blog', desc: 'Whitepapers, firmware architecture, IoT benchmarks' },
  { slug: 'careers', name: 'Careers & Open Positions', path: '/careers', desc: 'Hardware engineering openings and mentorship roles' },
  { slug: 'privacy-policy', name: 'Privacy Policy', path: '/privacy-policy', desc: 'Data handling, consent, student privacy compliance' },
  { slug: 'terms', name: 'Terms of Service', path: '/terms', desc: 'Terms and conditions for technical education and training' },
  { slug: 'refund-policy', name: 'Refund & Cancellation', path: '/refund-policy', desc: 'Fee structures, seat booking, refund regulations' },
];

