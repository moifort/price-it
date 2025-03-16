import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'

export default defineNuxtPlugin(async () => {
  useGqlToken(null)
  const { initDataRaw } = retrieveLaunchParams()
  if (initDataRaw) {
    useGqlToken({ token: initDataRaw, config: { type: 'tma' } })
  }
})
