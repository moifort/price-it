import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

declare module '#app' {
  interface NuxtApp {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}

export default defineNuxtPlugin(async ({ provide }) => {
  dayjs.extend(relativeTime)
  provide('dayjs', dayjs)
})
