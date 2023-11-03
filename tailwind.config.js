/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        jos: ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        xs: '.78rem',
        sm: '.87rem',
        base: '.9rem',
        lg: '1.2rem',
        '2xl': '1.7rem',
        '3xl': '2.1rem',
        '4xl': '2.5rem',
        '5xl': '2.8rem',
      },
      colors: {
        gray: 'hsl(0, 0%, 98%)',
        'gray-200': '#f5f2f2',
        grayish: {
          100: '#fafafa',
          101: 'hsl(236, 33%, 92%)',
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
          100: '#32344d',
          200: 'hsl(235, 24%, 19%)',
          202: 'hsl(235, 21%, 11%)',
        },
        blue: 'hsl(220, 98%, 61%)',
        sky: 'hsl(192, 100%, 67%)',
        purple: 'hsl(280, 87%, 65%)',
        violet: {
          100: '#7d72cf',
          200: '#9a57d4'
        },
        'dark-sky': '#5785d4',
        auth: {
          bg: '#ebe9f4',
          card: '#F8F8FD',
          blue: '#5785D4',
          'blue-h': '#6a99eb',
          gray: '#717D93',
          slate: '#384252',
          'slate-h': '#55698b',
        }
      },
      screens: {
        'md': '633px'
      },
    },
  },
  plugins: [],
}

