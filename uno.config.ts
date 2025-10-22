// @ts-nocheck
import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind from '@unocss/preset-wind'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetAnimations(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      brand: {
        DEFAULT: '#60a5fa',
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
  },
  shortcuts: {
    card: 'rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20',
    glass: 'bg-white/5 backdrop-blur supports-backdrop-blur:bg-white/10',
    'btn-primary': 'px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg active:(scale-98)',
    pill: 'px-2 py-0.5 rounded-full text-xs font-medium border border-white/10',
  },
  safelist: [
    // status colors
    'text-success', 'text-warning', 'text-danger',
    'bg-success/20', 'bg-warning/20', 'bg-danger/20',
    'animate-fade-in', 'animate-zoom-in', 'animate-bounce-in', 'animate-duration-700',
  ],
})


