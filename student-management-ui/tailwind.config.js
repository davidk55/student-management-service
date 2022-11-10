/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'my-font': ['Roboto'],
      },
      colors: {
        'my-white': '#FBFAF6',
      },
    },
  },
  plugins: [],
};
