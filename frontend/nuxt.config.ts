import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

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