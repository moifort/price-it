export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-graphql-client'],
  shadcn: {
    prefix: '',
    componentDir: './components/atoms',
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST ?? 'http://127.0.0.1:5001/price-it-85b3e/europe-west3/api',
    },
  },
})
