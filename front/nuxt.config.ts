export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  typescript: { strict: true, shim: true },
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
        UserId: '../../../back/src/player/types#PlayerId',
        Score: '../../../back/src/score/types#Score',
        Point: '../../../back/src/score/types#Point',
        Minute: '../../../back/src/utils/types#Minute',
        Seconde: '../../../back/src/utils/types#Seconde',
        Limit: '../../../back/src/utils/types#Limit',
        Percentage: '../../../back/src/utils/types#Percentage',
        Amount: '../../../back/src/utils/types#Amount',
        PercentagePoint: '../../../back/src/utils/types#PercentagePoint',
        Url: '../../../back/src/utils/types#Url',
        Quantity: '../../../back/src/utils/types#Quantity',
        Run: '../../../back/src/run/types#Run',
        ProductId: '../../../back/src/product/types#ProductId',
        ShopProductId: '../../../back/src/shop/types#ShopProductId',
        Period: '../../../back/src/shop/types#Period',
        WalletId: '../../../back/src/airdrop/types#WalletId',
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
