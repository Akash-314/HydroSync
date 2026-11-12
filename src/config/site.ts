export const siteConfig = {
  name: 'HydroSync Innovations LLP',
  shortName: 'HydroSync',
  tagline: 'Technology • IoT • Embedded Systems • AI',
  motto: 'Innovation for a Healthier Tomorrow',
  description:
    'Operating in technology, IoT, Embedded Systems, AI, technical training, internships, projects and innovation.',
  contact: {
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'contact@hydrosync.in',
    phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || null,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    address: 'Bengaluru, Karnataka, India',
    workingHours: 'Monday - Saturday: 9:00 AM - 6:30 PM IST',
  },
  socials: {
    facebook: 'https://facebook.com/hydrosyncinnovations',
    instagram: 'https://instagram.com/hydrosync.in',
    youtube: 'https://youtube.com/@hydrosync-innovations',
    linkedin: 'https://linkedin.com/company/hydrosync-innovations',
  },
  mainNav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'Events', href: '/events' },
    {
      label: 'Institutions',
      href: '#',
      children: [
        {
          label: 'For Schools',
          href: '/for-schools',
          description: 'STEM education, Atal Tinkering Labs & robotics kits',
        },
        {
          label: 'For Colleges',
          href: '/for-colleges',
          description: 'Institutional MoUs, Centers of Excellence & FDPs',
        },
      ],
    },
    { label: 'Projects', href: '/projects' },
    {
      label: 'Resources',
      href: '#',
      children: [
        {
          label: 'Live Classes',
          href: '/live-classes',
          description: 'Real-time masterclasses and interactive bootcamps',
        },
        {
          label: 'Hardware Gallery',
          href: '/gallery',
          description: 'Laboratories, workshop deliveries & campus events',
        },
        {
          label: 'Blog / Resources',
          href: '/blog',
          description: 'Technical articles, firmware pinouts & tutorials',
        },
      ],
    },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ],
  footerQuickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'Events & Workshops', href: '/events' },
    { label: 'Projects Showcase', href: '/projects' },
    { label: 'Engineering Team', href: '/team' },
    { label: 'Contact Directory', href: '/contact' },
  ],
  footerPolicyLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
};
