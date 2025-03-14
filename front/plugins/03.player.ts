export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'development') return
  await GqlCreatePlayer()
})
