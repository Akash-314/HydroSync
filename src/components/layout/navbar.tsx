'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  School,
  Building2,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  Sparkles,
  LogIn,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { HydroSyncLogo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<'institutions' | 'resources' | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<{ [key: string]: boolean }>({
    institutions: false,
    resources: false,
  });

  const institutionsRef = React.useRef<HTMLDivElement>(null);
  const resourcesRef = React.useRef<HTMLDivElement>(null);

  // Throttled scroll detection for compact sticky header
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 12;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on outside click or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideInstitutions = institutionsRef.current?.contains(target);
      const isInsideResources = resourcesRef.current?.contains(target);
      if (!isInsideInstitutions && !isInsideResources) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name: 'institutions' | 'resources') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileGroup = (name: string) => {
    setMobileExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const institutionsSublinks = [
    {
      label: 'For Schools',
      href: '/for-schools',
      description: 'STEM labs, robotics kits & experiential training',
      icon: School,
    },
    {
      label: 'For Colleges',
      href: '/for-colleges',
      description: 'Centres of Excellence, MoUs & faculty development',
      icon: Building2,
    },
  ];

  const resourcesSublinks = [
    {
      label: 'Live Classes',
      href: '/live-classes',
      description: 'Scheduled interactive weekend hardware bootcamps',
      icon: Calendar,
    },
    {
      label: 'Gallery & Expos',
      href: '/gallery',
      description: 'Lab setups, student buildathons & event photographs',
      icon: ImageIcon,
    },
    {
      label: 'Technical Blog',
      href: '/blog',
      description: 'Firmware articles, circuit teardowns & project case studies',
      icon: BookOpen,
    },
  ];

  const isInstitutionsActive = ['/for-schools', '/for-colleges'].includes(pathname);
  const isResourcesActive = ['/live-classes', '/gallery', '/blog'].includes(pathname);

  // Helper for desktop nav links with restrained blue active state in dark mode
  const getNavLinkClass = (isActive: boolean) =>
    cn(
      'px-2.5 py-1.5 rounded-md transition-colors',
      isActive
        ? 'text-brand-secondary font-semibold dark:text-white dark:bg-brand-midnight-french/40'
        : 'text-theme-heading hover:text-brand-secondary dark:hover:text-[#F5F7FB] dark:hover:bg-brand-dark-surface'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200 border-b border-theme-border dark:border-brand-dark-border',
        isScrolled
          ? 'h-16 bg-theme-surface/95 dark:bg-brand-dark-bg/95 backdrop-blur-md shadow-sm'
          : 'h-[72px] bg-theme-surface/90 dark:bg-brand-dark-bg/90 backdrop-blur-sm'
      )}
    >
      <Container className="flex h-full items-center justify-between">
        {/* Official Brand Logo */}
        <HydroSyncLogo isCompact={false} />

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-0.5 text-[13.5px] font-medium"
        >
          {/* 1. Home */}
          <Link href="/" prefetch={true} className={getNavLinkClass(pathname === '/')}>
            Home
          </Link>

          {/* 2. About Us */}
          <Link href="/about" prefetch={true} className={getNavLinkClass(pathname === '/about')}>
            About Us
          </Link>

          {/* 3. Services */}
          <Link href="/services" prefetch={true} className={getNavLinkClass(pathname === '/services')}>
            Services
          </Link>

          {/* 4. Internships */}
          <Link href="/internships" prefetch={true} className={getNavLinkClass(pathname === '/internships')}>
            Internships
          </Link>

          {/* 5. Courses */}
          <Link href="/courses" prefetch={true} className={getNavLinkClass(pathname === '/courses')}>
            Courses
          </Link>

          {/* 6. Events */}
          <Link href="/events" prefetch={true} className={getNavLinkClass(pathname === '/events')}>
            Events
          </Link>

          {/* 7. Institutions Dropdown */}
          <div
            ref={institutionsRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown('institutions')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('institutions')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'institutions'}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent dark:focus-visible:ring-brand-midnight-yellow',
                isInstitutionsActive
                  ? 'text-brand-secondary font-semibold dark:text-white dark:bg-brand-midnight-french/40'
                  : 'text-theme-heading hover:text-brand-secondary dark:hover:text-[#F5F7FB] dark:hover:bg-brand-dark-surface',
                openDropdown === 'institutions' && 'text-brand-secondary dark:text-white'
              )}
            >
              <span>Institutions</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  openDropdown === 'institutions' && 'rotate-180'
                )}
              />
            </button>

            {openDropdown === 'institutions' && (
              <div
                role="menu"
                aria-label="Institutions menu"
                className="absolute top-full left-0 z-50 w-72 pt-2 animate-in fade-in-50 zoom-in-95 duration-150"
              >
                <div className="rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated p-2 shadow-xl backdrop-blur-lg">
                  {institutionsSublinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        'flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-theme-bg dark:hover:bg-brand-dark-elevated-sec',
                        pathname === sublink.href && 'bg-theme-bg dark:bg-brand-midnight-french/30 font-medium'
                      )}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-light-bg text-brand-secondary dark:bg-brand-dark-surface dark:text-brand-midnight-azure mt-0.5">
                        <sublink.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                          {sublink.label}
                        </div>
                        <p className="text-[11px] text-theme-muted dark:text-brand-dark-muted leading-tight mt-0.5">
                          {sublink.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 8. Projects */}
          <Link href="/projects" className={getNavLinkClass(pathname === '/projects')}>
            Projects
          </Link>

          {/* 9. Resources Dropdown */}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown('resources')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('resources')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'resources'}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent dark:focus-visible:ring-brand-midnight-yellow',
                isResourcesActive
                  ? 'text-brand-secondary font-semibold dark:text-white dark:bg-brand-midnight-french/40'
                  : 'text-theme-heading hover:text-brand-secondary dark:hover:text-[#F5F7FB] dark:hover:bg-brand-dark-surface',
                openDropdown === 'resources' && 'text-brand-secondary dark:text-white'
              )}
            >
              <span>Resources</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  openDropdown === 'resources' && 'rotate-180'
                )}
              />
            </button>

            {openDropdown === 'resources' && (
              <div
                role="menu"
                aria-label="Resources menu"
                className="absolute top-full left-0 z-50 w-80 pt-2 animate-in fade-in-50 zoom-in-95 duration-150"
              >
                <div className="rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-elevated p-2 shadow-xl backdrop-blur-lg">
                  {resourcesSublinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        'flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-theme-bg dark:hover:bg-brand-dark-elevated-sec',
                        pathname === sublink.href && 'bg-theme-bg dark:bg-brand-midnight-french/30 font-medium'
                      )}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-light-bg text-brand-secondary dark:bg-brand-dark-surface dark:text-brand-midnight-azure mt-0.5">
                        <sublink.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
                          {sublink.label}
                        </div>
                        <p className="text-[11px] text-theme-muted dark:text-brand-dark-muted leading-tight mt-0.5">
                          {sublink.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 10. Team */}
          <Link href="/team" prefetch={true} className={getNavLinkClass(pathname === '/team')}>
            Team
          </Link>

          {/* 11. Contact */}
          <Link href="/contact" prefetch={true} className={getNavLinkClass(pathname === '/contact')}>
            Contact
          </Link>
        </nav>

        {/* Desktop Header Actions (Theme Toggle + Sign In / Sign Up + Apply Now CTA) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <ThemeToggle />
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-theme-muted hover:text-theme-heading hover:bg-theme-bg/60 transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-brand-secondary hover:text-brand-primary hover:bg-brand-secondary/10 transition-colors"
          >
            <span>Sign Up</span>
          </Link>
          <Button
            href="/apply"
            variant="cta"
            size="sm"
            className="font-semibold text-xs tracking-wide shadow-sm"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            <span>Apply Now</span>
          </Button>
        </div>

        {/* Mobile Header Actions (Theme Toggle + Hamburger) */}
        <div className="flex xl:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-theme-heading dark:text-brand-dark-heading hover:bg-brand-light-bg dark:hover:bg-brand-dark-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent dark:focus-visible:ring-brand-midnight-yellow transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="xl:hidden fixed inset-x-0 top-[64px] sm:top-[72px] bottom-0 z-50 bg-theme-surface/98 dark:bg-brand-dark-bg/98 backdrop-blur-xl border-b border-theme-border dark:border-brand-dark-border overflow-y-auto p-5 sm:p-6 flex flex-col justify-between animate-in fade-in-50 duration-150"
        >
          <div className="space-y-1">
            {/* Quick Top CTA inside Drawer */}
            <div className="mb-4 pb-4 border-b border-theme-border/70 dark:border-brand-dark-border/70">
              <Button href="/apply" variant="cta" size="md" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Apply for Admission</span>
              </Button>
            </div>

            {/* Core Links */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/about'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              About Us
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/services'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Services
            </Link>
            <Link
              href="/internships"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/internships'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Internships
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/courses'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Courses
            </Link>
            <Link
              href="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/events'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Events
            </Link>

            {/* Mobile Expandable Institutions Group */}
            <div className="border-t border-theme-border/60 dark:border-brand-dark-border/60 pt-2">
              <button
                type="button"
                onClick={() => toggleMobileGroup('institutions')}
                className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted hover:text-theme-heading"
              >
                <span>Institutions</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    mobileExpanded.institutions && 'rotate-180 text-brand-secondary dark:text-brand-midnight-yellow'
                  )}
                />
              </button>
              {mobileExpanded.institutions && (
                <div className="mt-1 space-y-1 pl-3 border-l-2 border-brand-secondary/30 dark:border-brand-midnight-azure/50 ml-3">
                  {institutionsSublinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/projects'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Projects
            </Link>

            {/* Mobile Expandable Resources Group */}
            <div className="border-t border-theme-border/60 dark:border-brand-dark-border/60 pt-2">
              <button
                type="button"
                onClick={() => toggleMobileGroup('resources')}
                className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-theme-muted dark:text-brand-dark-muted hover:text-theme-heading"
              >
                <span>Resources</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    mobileExpanded.resources && 'rotate-180 text-brand-secondary dark:text-brand-midnight-yellow'
                  )}
                />
              </button>
              {mobileExpanded.resources && (
                <div className="mt-1 space-y-1 pl-3 border-l-2 border-brand-secondary/30 dark:border-brand-midnight-azure/50 ml-3">
                  {resourcesSublinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Team */}
            <Link
              href="/team"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/team'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Team
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                pathname === '/contact'
                  ? 'bg-theme-bg dark:bg-brand-midnight-french/30 text-brand-secondary dark:text-white font-bold'
                  : 'text-theme-heading dark:text-brand-dark-heading hover:bg-theme-bg dark:hover:bg-brand-dark-surface'
              )}
            >
              Contact Directory
            </Link>

            {/* Portal Sign In & Sign Up Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border border-theme-border text-theme-heading hover:bg-theme-bg transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary/20 transition-colors"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          </div>

          {/* Bottom Info inside Drawer */}
          <div className="pt-6 mt-6 border-t border-theme-border/60 dark:border-brand-dark-border/60 text-xs text-theme-muted dark:text-brand-dark-muted space-y-2">
            <div>
              <span className="font-semibold text-theme-heading dark:text-brand-dark-heading block">HydroSync Innovations LLP</span>
              <span>Bengaluru, Karnataka, India</span>
            </div>
            <div>
              <a href="mailto:contact@hydrosync.in" className="text-brand-secondary dark:text-brand-midnight-azure hover:underline">
                contact@hydrosync.in
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
