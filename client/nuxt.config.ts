// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  css: ['maz-ui/css/main.css', 'mapbox-gl/dist/mapbox-gl.css'],
  modules: ['@nuxt/ui', '@pinia/nuxt', 'maz-ui/nuxt', 'nuxt-mapbox'],
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  // plugins: ['maz-ui'],
  // mazUi: {
  //   injectComponents: true,
  //   injectCss: true,
  //   injectAos: {
  //     injectCss: true,
  //   },
  //   injectUseToast: true,
  //   injectUseThemeHandler: true,
  //   devtools: true,
  // },
})
