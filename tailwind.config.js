/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Slab"', 'serif'],
        lora: ['Lora', 'serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        flower: ['Indie Flower', 'cursive'],
        dancing: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
