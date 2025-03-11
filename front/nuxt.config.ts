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
      GQL_HOST: process.env.GQL_HOST ?? 'https://api-6zdezivzkq-ey.a.run.app',
    },
  },
})
