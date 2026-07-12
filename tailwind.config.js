/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0c0f0d',
          900: '#111512',
          800: '#171c18',
          700: '#222923',
          line: '#252c26',
        },
        moss: {
          DEFAULT: '#4a7c59',
          bright: '#6ea482',
          dim: '#37543f',
          faint: '#1c2b21',
        },
        bone: {
          DEFAULT: '#e8e6df',
          muted: '#9ba39c',
          faint: '#5f675f',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '68rem',
      },
    },
  },
  plugins: [],
}
