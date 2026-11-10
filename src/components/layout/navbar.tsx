'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Cpu,
  GraduationCap,
  School,
  Building2,
  Calendar,
  Layers,
  BookOpen,
  Award,
  Users,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<{ [key: string]: boolean }>({});

  // Close menus on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileGroup = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const institutionLinks = [
    {
      label: 'For Schools',
      href: '/for-schools',
      description: 'Atal Tinkering Labs, STEM curriculum & robotics kits',
      icon: School,
    },
    {
      label: 'For Colleges',
      href: '/for-colleges',
      description: 'MoUs, Centers of Excellence & Faculty Development',
      icon: Building2,
    },
  ];

  const resourceLinks = [
    {
      label: 'Live Classes',
      href: '/live-classes',
      description: 'Real-time masterclasses & weekend technical bootcamps',
      icon: Calendar,
    },
    {
      label: 'Events & Workshops',
      href: '/events',
      description: 'Hands-on hackathons and engineering expos',
      icon: Layers,
    },
    {
      label: 'Projects Showcase',
      href: '/projects',
      description: 'Industrial IoT deployments and student capstones',
      icon: Cpu,
    },
    {
      label: 'Technical Blog',
      href: '/blog',
      description: 'Firmware tutorials, pinouts & tech articles',
      icon: BookOpen,
    },
    {
      label: 'Certifications',
      href: '/certifications',
      description: 'HydroSync credential standards & sample format',
      icon: Award,
    },
    {
      label: 'Hardware Gallery',
      href: '/gallery',
      description: 'Physical labs, workshops and campus sessions',
      icon: ImageIcon,
    },
    {
      label: 'Partners',
      href: '/partners',
      description: 'Academic networks and technology alliances',
      icon: Users,
    },
    {
      label: 'Testimonials',
      href: '/testimonials',
      description: 'Alumni and institutional partner reviews',
      icon: GraduationCap,
    },
    {
      label: 'FAQ Knowledgebase',
      href: '/faq',
      description: 'Common questions on courses, kits and MoUs',
      icon: HelpCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-theme-border bg-theme-surface/90 backdrop-blur-md transition-colors">
      <Container className="flex h-[72px] items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white font-extrabold font-heading text-lg tracking-tighter dark:bg-brand-dark-blue-accent dark:text-brand-dark-bg">
            HS
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base tracking-tight text-theme-heading leading-tight">
              HydroSync
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-dark-blue-accent leading-none">
              Innovations LLP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/about' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            About
          </Link>
          <Link
            href="/services"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/services' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            Services
          </Link>
          <Link
            href="/internships"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/internships' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            Internships
          </Link>
          <Link
            href="/courses"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/courses' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            Courses
          </Link>

          {/* Institutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('institutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
                pathname.startsWith('/for-') ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
              )}
            >
              <span>Institutions</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {activeDropdown === 'institutions' && (
              <div className="absolute top-full left-0 w-72 rounded-lg border border-theme-border bg-theme-surface p-2 shadow-xl animate-in fade-in-50 zoom-in-95 duration-150">
                {institutionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-2.5 rounded-md hover:bg-theme-bg transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-theme-heading">{item.label}</div>
                      <div className="text-[11px] text-theme-muted mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
                ['/events', '/projects', '/gallery', '/blog', '/certifications', '/faq'].some((p) =>
                  pathname.startsWith(p)
                )
                  ? 'text-brand-secondary font-semibold'
                  : 'text-theme-heading'
              )}
            >
              <span>Resources</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full right-0 w-80 rounded-lg border border-theme-border bg-theme-surface p-2 shadow-xl animate-in fade-in-50 zoom-in-95 duration-150 grid grid-cols-1 gap-1">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-theme-bg transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-theme-heading">{item.label}</div>
                      <div className="text-[11px] text-theme-muted">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={cn(
              'px-3 py-2 rounded-md transition-colors hover:text-brand-secondary',
              pathname === '/contact' ? 'text-brand-secondary font-semibold' : 'text-theme-heading'
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Right Utilities */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button href="/apply" variant="primary" size="sm">
            Apply Now
          </Button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-theme-border bg-theme-surface text-theme-heading"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-50 bg-theme-surface/98 backdrop-blur-lg border-b border-theme-border overflow-y-auto p-6 space-y-4">
          <div className="space-y-1">
            <Link
              href="/"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg"
            >
              Services
            </Link>
            <Link
              href="/internships"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg"
            >
              Internships
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg"
            >
              Courses
            </Link>

            {/* Mobile Institutions Accordion */}
            <div className="border-t border-theme-border/60 pt-2">
              <button
                type="button"
                onClick={() => toggleMobileGroup('institutions')}
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold text-theme-muted"
              >
                <span>INSTITUTIONS</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileExpanded['institutions'] && 'rotate-180'
                  )}
                />
              </button>
              {mobileExpanded['institutions'] && (
                <div className="pl-4 space-y-1 mt-1">
                  {institutionLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-sm text-theme-heading hover:bg-theme-bg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources Accordion */}
            <div className="border-t border-theme-border/60 pt-2">
              <button
                type="button"
                onClick={() => toggleMobileGroup('resources')}
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold text-theme-muted"
              >
                <span>RESOURCES & SHOWCASE</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    mobileExpanded['resources'] && 'rotate-180'
                  )}
                />
              </button>
              {mobileExpanded['resources'] && (
                <div className="pl-4 space-y-1 mt-1">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-sm text-theme-heading hover:bg-theme-bg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="block px-3 py-2.5 rounded-md font-semibold text-theme-heading hover:bg-theme-bg border-t border-theme-border/60 mt-2"
            >
              Contact Directory
            </Link>
          </div>

          <div className="pt-4">
            <Button href="/apply" variant="primary" className="w-full">
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

