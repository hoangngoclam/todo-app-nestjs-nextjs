import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "--clr-BrightBlue": "hsl(220, 98%, 61%)",
        "--clr-LightTheme-VeryLightGray": "hsl(0, 0%, 98%)",
        "--clr-LightTheme-VeryLightGrayishBlue": "hsl(236, 33%, 92%)",
        "--clr-LightTheme-LightGrayishBlue": "hsl(233, 11%, 84%)",
        "--clr-LightTheme-DarkGrayishBlue": "hsl(236, 9%, 61%)",
        "--clr-LightTheme-VeryDarkGrayishBlue": "hsl(235, 19%, 35%)",
        "--clr-DarkTheme-VeryDarkBlue": "hsl(235, 21%, 11%)",
        "--clr-DarkTheme-VeryDarkDesaturatedBlue": "hsl(235, 24%, 19%)",
        "--clr-DarkTheme-LightGrayishBlue": "hsl(234, 39%, 85%)",
        "--clr-DarkTheme-LightGrayishBlueHover": "hsl(236, 33%, 92%)",
        "--clr-DarkTheme-DarkGrayishBlue": "hsl(234, 11%, 52%)",
        "--clr-DarkTheme-VeryDarkGrayishBlue": "hsl(233, 14%, 35%)",
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
