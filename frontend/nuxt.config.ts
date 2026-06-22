import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  app: {
    layoutTransition: true,
    head: {
      title: 'Huis van Salomon',
      titleTemplate: '%s | Huis van Salomon',
      htmlAttrs: { lang: 'nl' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon.ico' },
        { rel: 'shortcut icon', type: 'image/png', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }, ,
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ]
    }
  },


  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@pinia/nuxt', '@nuxt/image'],

  image: {
    // Options
  },

  nitro: {
    experimental: {
      wasm: true
    },
    devProxy: {
      '/api': {
        target: 'https://hvs.test',
        changeOrigin: true,
      },
    }
  },

  devServer: {
    port: 2026
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || '/api',
      BASE_URL: process.env.BASE_URL || 'https://hvs.test',
    },
  },
})