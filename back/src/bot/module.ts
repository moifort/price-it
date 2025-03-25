import { Bot } from 'grammy'
import type { TelegramToken } from '../utils/telegram/types'
import type { Url } from '../utils/types'

export const initialize = (token: TelegramToken, webhookUrl: Url, isProd: boolean) => {
  const bot = new Bot(token)
  if (isProd) bot.api.setWebhook(webhookUrl)
  return bot
}
