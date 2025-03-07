import type { Url } from '../../../back/src/utils/index.type'

export const openExternalUrl = (url: Url) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.openLink(url)
    return true
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_blank')
    return true
  }

  return false
}

// Add type definitions for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        openLink: (url: string) => void
      }
    }
  }
}
