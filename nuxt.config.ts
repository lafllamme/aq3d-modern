// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt'
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css'
  ],
  unocss: {
    // enable preflight to better match Tailwind-style resets
    preflight: true
  },
  nitro: {
    routeRules: {
      '/api/servers': { swr: 60 }
    }
  }
})
