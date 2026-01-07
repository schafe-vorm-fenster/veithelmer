/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{njk,md,html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-darkgray': '#1f1f1f',
        'brand-brown': '#8d5315',
        'brand-lightgray': '#eeeeee',
        'brand-mediumgray': '#cccccc',
        'brand-charcoal': '#333333',
      },
      fontFamily: {
        sans: ['Verdana', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'brand': '-1px 0 8px 2px rgba(0, 0, 0, 0.58)',
      },
    },
  },
  plugins: [],
};
