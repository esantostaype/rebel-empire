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
        antonio: 'var(--font-antonio)'
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