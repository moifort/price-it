import type { Updater } from '@tanstack/vue-table'
import { isTMA, postEvent } from '@telegram-apps/sdk-vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'
import type { Url } from '../../back/src/utils/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<unknown>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export const openLink = async (url: Url) => {
  if (await isTMA()) {
    postEvent('web_app_open_link', { url })
  } else {
    window.open(url, '_blank')
  }
}
