import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#080c0a',
          2: '#0d1210',
          3: '#111915',
        },
        surface: {
          DEFAULT: '#141f1a',
          2: '#1a2820',
        },
        accent: {
          DEFAULT: '#4cba7a',
          2: '#3da368',
          3: '#2d8a54',
        },
        gold: '#c9a96e',
        nuven: {
          border: 'rgba(255,255,255,0.07)',
          'border-accent': 'rgba(100,200,140,0.15)',
          text: '#e8ede9',
          'text-2': '#8fa898',
          'text-3': '#5a7066',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
        marquee: 'marquee 25s linear infinite',
        'fill-bar': 'fillBar 2s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fillBar: {
          from: { width: '0' },
          to: { width: '72%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
