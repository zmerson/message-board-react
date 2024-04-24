/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
"./src/**/*/*.{html,tsx}",
"./src/**/*.{html,tsx}",
"./src/*.{html,tsx}",
  ],
  purge: ['./src/**/*.tsx'],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    accentColor: {
      DEFAULT: '#2d518a',
      dark: '#f00',
    },
    extend: {
      colors: {
        primary: "#00f",
        red: "#f00",
        secondary: "#0f0",
        'accent-1': '#333',
        'accent-2': '#555',
        'accent-3': '#777',
        'accent-4': '#999',
        'accent-5': '#BBB',
        'accent-6': '#DDD',
        'accent-7': '#FFF',
        'accent-8': '#000',
        'accent-9': '#f00',
      },
    },
  },
  plugins: [],
}

