// custom color setup
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: '#8659D3',
        secondary: '#9095A0'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

