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
          // Dark palette
          'dark-bg': '#071522',
          'dark-surface': '#0F2639',
          'dark-elevated': '#153249',
          'dark-heading': '#F0F7FC',
          'dark-body': '#C0D2E0',
          'dark-border': '#254257',
          'dark-blue-accent': '#51BCE8',
          'dark-green-accent': '#49BD99',
        },
        // Semantic variable tokens mapped to RGB CSS variables with alpha-value support
        theme: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
          heading: 'rgb(var(--color-heading) / <alpha-value>)',
          body: 'rgb(var(--color-body) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          innovation: 'rgb(var(--color-innovation) / <alpha-value>)',
        },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
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
