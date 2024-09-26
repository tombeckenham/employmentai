/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)']
      },
      colors: {
        amber: {
          300: '#fcd34d',
          400: '#fbbf24'
        },
        teal: {
          500: '#14b8a6'
        },
        blue: {
          600: '#2563eb'
        },
        slate: {
          50: '#f8fafc',
          600: '#475569',
          800: '#1e293b',
          900: '#0f172a'
        },

        indigo: {
          300: '#A5B4FC',
          600: '#4f46e5',
          700: '#4338CA' // Newly added for deeper shade
        },
        purple: {
          400: '#C084FC',

          600: '#7c3aed'
        },
        yellow: {
          300: '#fde047',
          400: '#facc15',
          600: '#D97706'
        },
        gray: {
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF'
        },
        green: {
          400: '#34D399',
          600: '#059669'
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      backgroundImage: {
        'gradient-button': 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
      },

      keyframes: {
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '100%': { left: '0', opacity: '1' }
        },

        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        shine: 'shine 0.5s forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.shine-effect': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          opacity: '0'
        }
      })
    }),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ]
}

export default config
