import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Official Brand Light Palette
          primary: '#0B3970',
          secondary: '#0786C7',
          accent: '#24A5D5',
          'innovation-green': '#159B78',
          'light-bg': '#F3F8FC',
          'white-surface': '#FFFFFF',
          'heading-text': '#102E4A',
          'body-text': '#425B70',
          'muted-text': '#74899A',
          border: '#DCE7EF',

          // MIDNIGHT SKY Palette (Exact Specifications)
          'midnight-imperial': '#00296B', // Imperial Blue
          'midnight-french': '#003F88',   // French Blue
          'midnight-azure': '#00509D',    // Steel Azure
          'midnight-yellow': '#FDC500',   // School Bus Yellow
          'midnight-gold': '#FFD500',     // Gold

          // Dark Background System
          'dark-bg': '#07152B',           // Main page background
          'dark-bg-alt': '#0A1B34',       // Alternate section background
          'dark-surface': '#0D2342',      // Primary card surface
          'dark-elevated': '#122D50',     // Elevated card surface
          'dark-elevated-sec': '#18385C', // Secondary elevated surface
          'dark-border': '#244365',       // Border
          'dark-divider': '#1D3655',      // Subtle divider

          // Dark Typography Colors
          'dark-heading': '#F5F7FB',      // Primary headings
          'dark-body': '#CFD9E6',         // Body text
          'dark-secondary': '#ACBDCF',    // Secondary text
          'dark-muted': '#879DB5',        // Muted text

          // Semantic Aliases
          'dark-blue-accent': '#00509D',   // Replaced generic cyan with Steel Azure
          'dark-green-accent': '#159B78',
        },
        // Semantic variable tokens mapped to RGB CSS variables with alpha-value support
        theme: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          'bg-alt': 'rgb(var(--color-bg-alt) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
          'elevated-secondary': 'rgb(var(--color-elevated-secondary) / <alpha-value>)',
          heading: 'rgb(var(--color-heading) / <alpha-value>)',
          body: 'rgb(var(--color-body) / <alpha-value>)',
          'secondary-text': 'rgb(var(--color-secondary-text) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          divider: 'rgb(var(--color-divider) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          'accent-gold': 'rgb(var(--color-accent-gold) / <alpha-value>)',
          'brand-imperial': 'rgb(var(--color-brand-imperial) / <alpha-value>)',
          innovation: 'rgb(var(--color-innovation) / <alpha-value>)',
          cta: 'rgb(var(--color-cta) / <alpha-value>)',
          'cta-text': 'rgb(var(--color-cta-text) / <alpha-value>)',
          'cta-hover': 'rgb(var(--color-cta-hover) / <alpha-value>)',
        },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        container: '1240px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
