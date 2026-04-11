import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}' // Include the pages directory
  ],
  theme: {
    extend: {
      screens: {
        xs: '100px',
        lg991: '991px',
        xl992: '992px',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif', 'Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'announcement-marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'announcement-marquee': 'announcement-marquee 155s linear infinite',
      },
    }
  },
  plugins: []
};

export default config;
