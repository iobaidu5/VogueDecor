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
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],  // ← use your CSS var
        poppins: ['Poppins', 'sans-serif'],
      },
    }
  },
  plugins: []
};

export default config;
