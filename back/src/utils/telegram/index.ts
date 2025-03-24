import { onRequest } from 'firebase-functions/https'
import { useTelegramBot } from './bot'
import { TelegramToken } from './validators'

export const TELEGRAM_WEBHOOK_URL = 'https://europe-west3-price-it-85b3e.cloudfunctions.net/telegram-bot'
export const bot = onRequest(async (req, res) => {
  const bot = useTelegramBot(TelegramToken(process.env.TELEGRAM_TOKEN))
  const app = null
  return app(req, res)
})
