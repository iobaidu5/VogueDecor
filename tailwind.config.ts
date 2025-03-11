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
      },
    }
  },
  plugins: []
};

export default config;
