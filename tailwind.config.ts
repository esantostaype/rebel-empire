import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-base)',
        white: 'white'
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        antonio: 'var(--font-antonio)'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '4/5': '4 / 5',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(.75,0,.25,1)',
      },
      transitionDuration: {
        'default': '400ms',
      }
    }
  },
  plugins: [
    require('tailwindcss-animated'),
    require('tailwind-gradient-mask-image'),
    require('tailwindcss-3d')
  ]
}
export default config