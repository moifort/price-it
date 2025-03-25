import { onRequest } from 'firebase-functions/https'
import { getContext } from '../module'
import { server } from './server'

export const bot = onRequest(async (req, res) => {
  const { $telegramBot } = getContext()
  const app = await server($telegramBot)
  const request = app(req, res)
  $telegramBot.on('message', async (ctx) => {
    console.log(ctx.message)
    await ctx.reply('Hello! je suis thibaut')
  })
  return request
})
