import { Bot } from 'grammy'
import type { TelegramToken } from '../utils/telegram/types'
import type { Url } from '../utils/types'

let bot: Bot | null = null

export const initTelegramBot = async (token: TelegramToken, url: Url) => {
  if (bot) return bot
  bot = new Bot(token)
  await bot.api.setWebhook(url)
  return bot
}

export const useTelegramBot = () => {
  if (!bot) throw new Error('Bot not initialized, use `initTelegramBot` before.')
  return bot
}
