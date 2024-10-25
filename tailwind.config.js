/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
    colors: {
      'border': '#554B6A',
      'light-gray': '#E9F0F5',
      'off-white': '#F2F7FB',
      'progress': '#B6E5FF',
      'complete': '#76EEC4'
    }
  },
  plugins: [],
}
