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
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
