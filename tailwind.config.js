/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        pastel: {
          green: '#d4edda',
          pink: '#fce4ec',
          yellow: '#fff9c4',
          purple: '#ede7f6',
          blue: '#e3f2fd',
        }
      },
      fontFamily: {
        kawaii: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}