/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      spacing: {
        1: '6px',
        2: '12px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '48px',
      },
      colors: {
        gray: 'hsl(0, 0%, 98%)',
        grayish: {
          100: 'hsl(236, 33%, 92%)',
          102: 'hsl(233, 11%, 84%)',
          104: 'hsl(236, 9%, 61%)',
          108: 'hsl(235, 19%, 35%)',
          200: 'hsl(236, 33%, 92%)',
          202: 'hsl(234, 39%, 85%)',
          204: 'hsl(234, 11%, 52%)',
          208: 'hsl(233, 14%, 35%)',
          209: 'hsl(237, 14%, 26%)'
        },
        slate: {
          200: 'hsl(235, 24%, 19%)',
          202: 'hsl(235, 21%, 11%)',
        },
      },
    },
  },
  plugins: [],
}

