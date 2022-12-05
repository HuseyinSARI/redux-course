/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '640': '640px',
      },
      height: {
        '640': '640px'
      },
      colors: {
        'boardBackground': '#C7BCA1',
        'whiteStoneBackground': '#e9edc9',
        'blackStoneBackground': '#081c15',        
      },
    },
  },
  plugins: [],
}