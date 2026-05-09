/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          100: '#fdfbf7',
          200: '#f6f0e3',
          300: '#e8ddc5',
          400: '#d7c49f',
          500: '#c2a571',
          600: '#ab8854',
          700: '#8c6b43',
          800: '#75583b',
          900: '#5e4832',
        },
        ink: {
          100: '#d5d2d0',
          500: '#4a4441',
          800: '#2d2927',
          900: '#1c1918',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
      }
    },
  },
  plugins: [],
}
