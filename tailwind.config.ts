import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },

      colors: {
        brand: {
          100: '#FAF1EE',  // Bakgrunnsfarge
          200: '#E7BDB2',  // Headerfarge
          300: '#65491E',  // Tekstfarge
          400: '#F2DBDD',
          500: '#F5E4DE',
          600: '#EDD0C8',  // Prisliste/Knappfarge/kort osv
          700: '#DAA399',
          800: '#E7BDB2',
          900: '#65491E',
        },
        accent: {
          100: '#65491E',
          200: '#E7BDB2',
          300: '#65491E',
          400: '#F2DBDD',
          500: '#F5E4DE',
          600: '#EDD0C8',
          700: '#DAA399',
          800: '#E7BDB2',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
