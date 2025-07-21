const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primaryDark: '#0F172A', // dark background color
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        550: '550',
      },
    },
    screens: {
      sm: '640px',
      md: '1200px',
      lg: '1280px',
      xl: '1536px',
    },
  },

  plugins: [],
};
 