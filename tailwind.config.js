/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#fdf4d1',
          grid: '#d8cd9e',
        },
        retro: {
          green: '#152c1b',
          'green-light': '#2c4733',
          yellow: '#fde047',
          orange: '#ea580c',
          red: '#dc2626',
        }
      },
      fontFamily: {
        heading: ['Epilogue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px #152c1b',
        'retro-hover': '6px 6px 0px 0px #152c1b',
        'retro-sm': '2px 2px 0px 0px #152c1b',
      }
    },
  },
  plugins: [],
}
