import { Bot } from 'grammy'
import { TELEGRAM_WEBHOOK_URL } from './index'
import type { TelegramToken } from './types'

let botInstance: Bot | null = null
export const useTelegramBot = (token: TelegramToken) => {
  if (!botInstance) {
    botInstance = new Bot(token)
    botInstance.api.setWebhook(TELEGRAM_WEBHOOK_URL)
  }
  return botInstance
}
