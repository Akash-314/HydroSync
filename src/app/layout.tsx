import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

