import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
  ],
  theme: {
    colors: {
      primary: {
        400: '#F687B3', // pink-400
        500: '#ED64A6', // pink-500
      },
      gray: {
        100: '#F7FAFC',
        200: '#EDF2F7',
        600: '#4A5568',
      },
    },
    fontSize: {
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    boxShadow: {
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    borderRadius: {
      lg: '0.5rem',
    },
  },
  shortcuts: {
    'btn-primary': 'px-6 py-3 bg-primary-400 text-white font-semibold rounded-lg shadow-md hover:bg-primary-500 transition duration-300',
    'section-title': 'text-4xl font-bold text-center text-primary-400 mb-6',
    'section-text': 'text-lg text-gray-600',
    'card': 'bg-white p-6 rounded-lg shadow-md',
  },
})