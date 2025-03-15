export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'test') return
  await GqlCreatePlayer()
})
