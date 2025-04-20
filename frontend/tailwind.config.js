/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da8ff',
          DEFAULT: '#0c71c9',
          dark: '#0c59a1',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
        },
        dark: {
          lighter: '#2d3748',
          light: '#1a202c',
          DEFAULT: '#121212',
          deep: '#111111',
        },
        light: {
          DEFAULT: '#f7f7f7',
          dark: '#e5e5e5',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'neon': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px theme("colors.primary.light")',
      }
    },
  },
  plugins: [],
}