export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'shadcn-nuxt', 'nuxt-graphql-client'],
  colorMode: { classSuffix: '' },
  shadcn: {
    prefix: '',
    componentDir: './components/atoms',
  },
  'graphql-client': {
    codegen: {
      scalars: {
        PlayerId: '../../../back/src/player/types#PlayerId',
        Score: '../../../back/src/score/types#Score',
        Point: '../../score/types#Point',
      },
    },
    clients: {
      default: {
        host: process.env.GQL_HOST ?? 'http://127.0.0.1:5001/price-it-85b3e/europe-west3/api',
        schema: '../back/src/api/__generated__/graphql.schema.json',
      },
    },
  },
  runtimeConfig: {
    public: {},
  },
})
