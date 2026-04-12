/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#e91e8c',
          light: '#ff4db8',
          dark: '#c0176f',
        },
        black: {
          DEFAULT: '#0a0a0a',
          surface: '#111111',
          card: '#161616',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        script: ['Pacifico', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
