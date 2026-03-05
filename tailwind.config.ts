import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blossom: {
          50: '#F5F3FF',   // Subtle Backgrounds
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',  // Main Brand Color
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',  // Deep Deep Purple
          950: '#2E1065',  // Dark Mode Text/Surfaces
        },
        // Semantic Tokens (Best practice for design systems)
        surface: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
          brand: '#8B5CF6',
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
          onBrand: '#FFFFFF',
        },
        border: {
          subtle: '#E5E7EB',
          default: '#D1D5DB',
          active: '#8B5CF6',
        }
      },
      borderRadius: {
        // "Blossom" uses organic but precise geometry
        'blossom-sm': '4px',
        'blossom-md': '8px',
        'blossom-lg': '16px',
        'blossom-full': '9999px',
      },
      boxShadow: {
        // Soft purple glows for active states
        'blossom-focus': '0 0 0 4px rgba(139, 92, 246, 0.15)',
        'blossom-elevated': '0 10px 15px -3px rgba(76, 29, 149, 0.1), 0 4px 6px -2px rgba(76, 29, 149, 0.05)',
      },
      fontFamily: {
        // Modern sans-serif stack
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'sans-serif'], // Great for headings
      },
    },
  },
  plugins: [],
}

export default config