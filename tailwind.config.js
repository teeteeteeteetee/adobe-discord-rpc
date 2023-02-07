/** @type {import('tailwindcss').Config} */
module.exports = {  
  content: [
    './dist/*.{html,js,css}',
    "./src/client-src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      typography: ({theme}) => ({
        DEFAULT: {
          css: {
            color: '#dcddde',
            a: {
              color: '#dcddde'
            }
          }
        }
      }),
      colors: {
        primary: '#36393f',
        secondary: '#2f3136',
        tertiary: '#292b2f',
        error: '#fb4549',
        button: '#5865f2',
        checkbox: '#3ba55c'
      },
      fontFamily: {
  
      },
    },
  },
  plugins: [
    '@tailwindcss/typography'
  ],
}
