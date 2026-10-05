/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          950: '#070605',
          900: '#0e0b08',
          850: '#15110c',
          800: '#1f1812',
          700: '#2d241a',
          600: '#423526',
          500: '#67523b',
          400: '#9b7c58',
          300: '#c5a378',
          200: '#dfcaa8',
          100: '#f1e6d4',
          50: '#faf6ee',
        },
        amberGlow: {
          50: '#fffbf0',
          100: '#fff4cc',
          200: '#ffe699',
          300: '#ffd266',
          400: '#ffb72e',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        brass: {
          light: '#e6c887',
          DEFAULT: '#c89d53',
          dark: '#936a28',
          shadow: '#4a3411',
        },
        copper: {
          light: '#f29b76',
          DEFAULT: '#c86432',
          dark: '#8b3814',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(245, 158, 11, 0.3)',
        'glow-md': '0 0 30px rgba(245, 158, 11, 0.45)',
        'glow-lg': '0 0 50px rgba(245, 158, 11, 0.65)',
        'glow-xl': '0 0 80px rgba(251, 191, 36, 0.8)',
        'filament': '0 0 10px #ffb72e, 0 0 20px #f59e0b, 0 0 35px #d97706',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0.75' },
          '43%': { opacity: '1' },
          '45.99%': { opacity: '1' },
          '46%': { opacity: '0.85' },
          '46.5%': { opacity: '1' },
          '70%': { opacity: '1' },
          '70.5%': { opacity: '0.88' },
          '71%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        flicker: 'flicker 4s infinite ease-in-out',
        pulseGlow: 'pulseGlow 3s infinite ease-in-out',
        float: 'float 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
