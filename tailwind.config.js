/*
 * File: tailwind.config.js
 * Project: discord-rpc
 * File Created: Sunday, 2nd July 2023 1:46:05 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 18th September 2023 11:25:42 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */
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
        blurple: '#5865f2',
        blurple_dark: '#232861',
        blurple_darker: '#131635',
        error: '#fb4549',
        button: '#5865f2',
        checkbox: '#3ba55c',
        dropdown: "#1e1f22"
      },
      fontFamily: {
        'azeri_regular': ['Azeri-Regular', "sans-serif"],
        'azeri_bold': ['Azeri-Bold', "sans-serif"],
        'azeri_black': ['Azeri-Black', "sans-serif"]
      },
    },
  },
  plugins: [
    '@tailwindcss/typography'
  ],
}
