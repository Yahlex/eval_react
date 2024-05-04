import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#e3f2fd',
              100: '#bbdefb',
              200: '#90caf9',
              300: '#64b5f6',
              400: '#42a5f5',
              500: '#2196f3',
              600: '#1e88e5',
              700: '#1976d2',
              800: '#1565c0',
              900: '#0d47a1',
              950: '#082887',
              DEFAULT: '#2196f3'
            }
          }
        },
        dark: {
          colors: {
            primary: {
              50: '#effcfc',
              100: '#d7f5f6',
              200: '#b4eaed',
              300: '#81dadf',
              400: '#46c1ca',
              500: '#2fb8c5',
              600: '#268594',
              700: '#256c79',
              800: '#265964',
              900: '#234b56',
              950: '#12303a',
              foreground: '#FFFFFF',
              DEFAULT: '#2fb8c5'
            }
          }
        }
      }
    })]
}
