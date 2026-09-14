/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.hbs', './public/js/**/*.js', './src/**/*.ts'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Deep navy — surfaces, headings, footer
        ink: {
          50: '#F4F7FB',
          100: '#E6EDF6',
          200: '#C6D6E9',
          300: '#9AB2D0',
          400: '#5C7CA5',
          500: '#33547E',
          600: '#1E3C63',
          700: '#132D4E',
          800: '#0D2140',
          900: '#08182F',
          950: '#050F1F',
        },
        // Brand blue — sampled from the RK mark (#1A75BC is the logo's exact blue)
        brand: {
          50: '#EEF6FC',
          100: '#D6EAF7',
          200: '#AFD5EF',
          300: '#7DBBE4',
          400: '#439CD3',
          500: '#2183C6',
          600: '#1A75BC',
          700: '#175F98',
          800: '#164F7C',
          900: '#164367',
        },
        // Brand green — sampled from the logo wordmark (#66D110)
        accent: {
          50: '#F2FCE8',
          100: '#E1F8CB',
          200: '#C4F09C',
          300: '#9EE55F',
          400: '#7ED92B',
          500: '#66D110',
          600: '#4FA80C',
          700: '#3D7F10',
          800: '#336412',
          900: '#2C5414',
        },
        // The chartreuse block inside the RK mark, for artwork-matching details
        spark: '#D3D506',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(8 24 47 / 0.08), 0 12px 32px -8px rgb(8 24 47 / 0.10)',
        lift: '0 8px 20px -6px rgb(8 24 47 / 0.14), 0 24px 60px -20px rgb(8 24 47 / 0.22)',
        glow: '0 10px 30px -8px rgb(102 209 16 / 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
