import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteLayoutWrapper } from '@/components/layout/site-layout-wrapper';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hydrosync.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | HydroSync Innovations LLP',
    default: 'HydroSync Innovations LLP | IoT, Embedded Systems & AI',
  },
  description:
    'HydroSync Innovations LLP operates in technology, IoT, Embedded Systems, AI, technical training, internships, projects and innovation.',
  keywords: [
    'HydroSync',
    'IoT',
    'Embedded Systems',
    'Edge AI',
    'Technical Internships',
    'Robotics',
    'Atal Tinkering Labs',
    'College MoUs',
  ],
  authors: [{ name: 'HydroSync Innovations LLP' }],
  creator: 'HydroSync Innovations LLP',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo/hydrosync-logo-mark.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'HydroSync Innovations LLP',
    title: 'HydroSync Innovations LLP | IoT, Embedded Systems & AI',
    description:
      'HydroSync Innovations LLP operates in technology, IoT, Embedded Systems, AI, technical training, internships, projects and innovation.',
    images: [
      {
        url: '/images/logo/hydrosync-logo.png',
        width: 928,
        height: 805,
        alt: 'HydroSync Innovations LLP Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HydroSync Innovations LLP | IoT, Embedded Systems & AI',
    description:
      'HydroSync Innovations LLP operates in technology, IoT, Embedded Systems, AI, technical training, internships, projects and innovation.',
    images: ['/images/logo/hydrosync-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-theme-bg text-theme-body antialiased selection:bg-brand-secondary selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

