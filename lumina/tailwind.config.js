/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft Rose/Blush - Primary (warm, welcoming)
        primary: {
          DEFAULT: '#E8A0BF',
          50: '#FDF2F6',
          100: '#FCE7EF',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#E8A0BF',
          500: '#DB7093',
          600: '#C75B7A',
          700: '#A14A64',
          800: '#7D3A4F',
          900: '#5C2B3B',
        },
        // Lavender/Lilac - Accent (creative, dreamy)
        accent: {
          DEFAULT: '#B8A9C9',
          50: '#F5F3F7',
          100: '#EDE9F2',
          200: '#DDD6E8',
          300: '#C9BBDB',
          400: '#B8A9C9',
          500: '#9D8BB8',
          600: '#8270A4',
          700: '#675888',
          800: '#4F4469',
          900: '#3A334D',
        },
        // Soft Mint/Seafoam - Success
        success: {
          DEFAULT: '#98D4BB',
          50: '#F0FAF6',
          100: '#E0F5EC',
          200: '#C2EBD9',
          300: '#98D4BB',
          400: '#6FC4A4',
          500: '#4CAF8A',
          600: '#3D8F70',
          700: '#316F58',
          800: '#275545',
          900: '#1F4236',
        },
        // Soft Coral/Peach - Warning/Warm accent
        coral: {
          DEFAULT: '#FFBE98',
          50: '#FFF7F2',
          100: '#FFEDE0',
          200: '#FFDDC7',
          300: '#FFCBA8',
          400: '#FFBE98',
          500: '#F5A673',
          600: '#E08850',
          700: '#C46D38',
          800: '#9E5429',
          900: '#78401F',
        },
        // Soft Red/Rose for errors
        error: {
          DEFAULT: '#E57373',
          50: '#FDF2F2',
          100: '#FCE4E4',
          200: '#FACACA',
          300: '#F5A3A3',
          400: '#E57373',
          500: '#D45555',
          600: '#B83E3E',
          700: '#962F2F',
          800: '#752525',
          900: '#581D1D',
        },
        // Soft cream/lavender background (light mode feel with soft tones)
        background: '#FAF7F5',
        'background-alt': '#F5F0EB',
        surface: '#FFFFFF',
        'surface-alt': '#FDF9F7',

        // Text colors for light backgrounds
        'text-primary': '#4A4458',
        'text-secondary': '#7D7589',
        'text-muted': '#A9A0B4',

        // Special accents
        gold: '#D4A574',
        'soft-pink': '#FFD6E0',
        'soft-lavender': '#E8E0F0',
        'soft-mint': '#D4F0E7',
        'soft-peach': '#FFE8D6',
      },
      fontFamily: {
        heading: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Quicksand', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'typing-dot': 'typingDot 1.4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(232, 160, 191, 0.4)',
        'glow-accent': '0 0 25px rgba(184, 169, 201, 0.4)',
        'glow-success': '0 0 25px rgba(152, 212, 187, 0.4)',
        'glow-coral': '0 0 25px rgba(255, 190, 152, 0.4)',
        'glow-error': '0 0 20px rgba(229, 115, 115, 0.35)',
        'soft': '0 4px 20px rgba(74, 68, 88, 0.08)',
        'soft-lg': '0 8px 30px rgba(74, 68, 88, 0.12)',
        'dreamy': '0 8px 40px rgba(232, 160, 191, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-soft': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'pastel-mesh': 'linear-gradient(135deg, #FAF7F5 0%, #F5F0EB 50%, #FDF9F7 100%)',
      },
    },
  },
  plugins: [],
}
