import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#136af8',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: '#f2f5fa',
          foreground: '#667180',
        },
        accent: {
          DEFAULT: '#f0f6ff',
          foreground: '#101828',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#101828',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#101828',
        },
        // Figma Design Tokens
        brand: {
          primary: '#136af8',
          secondary: '#0274ff',
        },
        neutral: {
          900: '#101828',
          700: '#667180',
          500: '#8a9ab3',
          300: '#e7eaf0',
          100: '#e8eaf0',
        },
        semantic: {
          success: '#1ad093',
          'success-bg': '#cbf7d9',
          warning: '#fae8cd',
          error: '#ffdbdb',
          info: '#c8dffa',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        sidebar: '267px',
        header: '80px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
