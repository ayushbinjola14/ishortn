const {nextui} = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A878',
      },
      fontFamily: {
        mazzardRegular: ['MazzardH-Regular', 'sans-serif'],
        mazzardLBold: ['MazzardH-Bold', 'sans-serif'],
        ocean: [
          'Ocean-Semibold', 'sans-serif'
        ]
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
