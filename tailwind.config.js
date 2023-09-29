/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/dist/flowbite.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Slab"', 'serif'],
        lora: ['Lora', 'serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        flower: ['Indie Flower', 'cursive'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
