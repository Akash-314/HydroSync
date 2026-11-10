import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Platform Sitemap',
  description: 'Complete directory of all public routes and resources on the HydroSync Innovations LLP website.',
};

const SITEMAP_GROUPS = [
  {
    category: 'Corporate Overview',
    links: [
      { label: 'Home Page', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Leadership & Team', href: '/team' },
      { label: 'Careers & Openings', href: '/careers' },
      { label: 'Contact Directory', href: '/contact' },
    ],
  },
  {
    category: 'Engineering & Services',
    links: [
      { label: 'Industrial & IoT Services', href: '/services' },
      { label: 'Engineering Projects Showcase', href: '/projects' },
      { label: 'Hardware & Lab Gallery', href: '/gallery' },
      { label: 'Certifications Standards', href: '/certifications' },
    ],
  },
  {
    category: 'Technical Education',
    links: [
      { label: 'Engineering Internships', href: '/internships' },
      { label: 'Technical Courses', href: '/courses' },
      { label: 'Live Masterclasses', href: '/live-classes' },
      { label: 'Events & Hackathons', href: '/events' },
      { label: 'Apply for Admission', href: '/apply' },
    ],
  },
  {
    category: 'Institutional Enablement',
    links: [
      { label: 'For Schools (STEM & ATL)', href: '/for-schools' },
      { label: 'For Colleges (MoUs & CoE)', href: '/for-colleges' },
      { label: 'Academic Partners', href: '/partners' },
      { label: 'Student & Partner Testimonials', href: '/testimonials' },
      { label: 'Frequently Asked Questions', href: '/faq' },
    ],
  },
  {
    category: 'Resources & Governance',
    links: [
      { label: 'Technical Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms and Conditions', href: '/terms' },
      { label: 'Refund & Cancellation Policy', href: '/refund-policy' },
      { label: 'HTML Sitemap', href: '/sitemap' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div>
      <PageHero
        eyebrow="Navigation Index"
        title="Website Sitemap"
        subtitle="Complete index of all public information pages, catalogs, institutional sections, and compliance policies."
        breadcrumbs={[{ label: 'Sitemap' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITEMAP_GROUPS.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl border border-theme-border bg-theme-surface shadow-sm"
              >
                <h3 className="text-base font-bold font-heading text-theme-heading border-b border-theme-border pb-3 mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2.5 text-xs">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-theme-body hover:text-brand-secondary transition-colors inline-block"
                      >
                        &rarr; {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

