export default defineNuxtPlugin(async () => {
  // @ts-ignore
  if (window.STORYBOOK_ENV) return
  await GqlPlayerCreateIfNotExistCommand()
})
