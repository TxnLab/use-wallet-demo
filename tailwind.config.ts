import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        beni: ['Beni', ...defaultTheme.fontFamily.sans],
        algo: ['Algo', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'title-6xl': ['3.75rem', '0.7'],
        'title-7xl': ['5rem', '0.7'],
        'title-8xl': ['6rem', '0.7'],
        'title-9xl': ['8rem', '0.7'],
        'title-10xl': ['10rem', '0.7'],
        'title-11xl': ['12rem', '0.7']
      },
      screens: {
        xs: '390px',
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2560px'
      },
      keyframes: {
        'loading-pulse': {
          '0%, 60%, 100%': { opacity: '0.5' },
          '30%': { opacity: '1', transform: 'scale(1.1)' }
        }
      },
      animation: {
        'loading-pulse':
          'loading-pulse 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
export default config
