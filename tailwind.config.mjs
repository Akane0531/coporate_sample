/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        ...defaultTheme.screens, // https://tailwindcss.com/docs/screens#adding-smaller-breakpoints
      },
      colors: {
        primary: {
          50: '#eefdfc',
          100: '#d5f8f7',
          200: '#b0f1f0',
          300: '#60e1e0',
          400: '#3dd2d3',
          500: '#21b6b9',
          600: '#1e939c',
          700: '#1f767f',
          800: '#226068',
          900: '#205059',
          950: '#10353c',
        },
      },
    },
    fontFamily: {
      display: ['Lato', 'Noto Sans JP Variable', 'sans-serif'],
      body: ['Noto Sans JP Variable', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
