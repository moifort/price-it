import type { Url } from '../../../back/src/utils/index.type'

export const openExternalUrl = (url: Url) => {
  // Check if the Telegram WebApp is available
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.openLink(url)
    return true
  }

  // Fallback to regular window.open if Telegram WebApp is not available
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
