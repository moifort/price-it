export default defineNuxtPlugin(() => {
  const documentElement = document.documentElement
  if (!documentElement.classList.contains('dark')) {
    documentElement.classList.add('dark')
  }
})
