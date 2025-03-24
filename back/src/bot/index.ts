import express, { type Express } from 'express'
import { onRequest } from 'firebase-functions/https'
import { webhookCallback } from 'grammy'
import type { TelegramToken as TelegramTokenType } from '../utils/telegram/types'
import { TelegramToken } from '../utils/telegram/validators'
import type { Url as UrlType } from '../utils/types'
import { Url } from '../utils/validators'
import { initTelegramBot, useTelegramBot } from './bot'

let instance: Express | null = null
const server = async (token: TelegramTokenType, telegramBotWebhook: UrlType) => {
  if (instance) return instance
  instance = express()
  const bot = await initTelegramBot(token, telegramBotWebhook)
  instance.use(express.json())
  instance.use(webhookCallback(bot, 'express'))
  return instance
}

export const TELEGRAM_WEBHOOK_BOT_URL = Url('https://europe-west3-price-it-85b3e.cloudfunctions.net/bot')

export const bot = onRequest(async (req, res) => {
  const app = await server(TelegramToken(process.env.TELEGRAM_TOKEN), TELEGRAM_WEBHOOK_BOT_URL)
  const bot = useTelegramBot()
  bot.on('message', async (ctx) => {
    await ctx.reply('Hello! je suis thibaut')
  })
  return app(req, res)
})
