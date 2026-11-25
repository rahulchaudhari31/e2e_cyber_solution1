/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#070B14',
          950: '#04070D',
          900: '#070B14',
          800: '#0C1322',
          700: '#141D31',
          600: '#1D2942',
        },
        primary: {
          50: '#F1EFFF',
          100: '#E4E0FF',
          200: '#CBC3FF',
          300: '#A99BFF',
          400: '#8B78FF',
          500: '#6D5EF8',
          600: '#5B4BE0',
          700: '#4939B8',
          800: '#3B2F92',
          900: '#302874',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD7',
          200: '#FFD8AF',
          300: '#FFBC7D',
          400: '#FF9D52',
          500: '#F9812B',
          600: '#DE6414',
          700: '#B74B12',
          800: '#923C16',
          900: '#773316',
        },
        surface: {
          light: '#F7F8FC',
          muted: '#E9ECF5',
          dark: '#0E1526',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px -30px rgba(4, 7, 13, 0.7)',
        card: '0 30px 80px -40px rgba(4, 7, 13, 0.9)',
        lift: '0 34px 90px -38px rgba(109, 94, 248, 0.55)',
        glow: '0 0 0 1px rgba(169, 155, 255, 0.25), 0 24px 70px -30px rgba(109, 94, 248, 0.75)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #8B78FF 0%, #6D5EF8 45%, #5B4BE0 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FFBC7D 0%, #F9812B 100%)',
        'hero-glow': 'radial-gradient(circle at 12% 8%, rgba(109, 94, 248, 0.24), transparent 42%), radial-gradient(circle at 88% 18%, rgba(249, 129, 43, 0.14), transparent 38%)',
        grid: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 8s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
