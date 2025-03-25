import { onRequest } from 'firebase-functions/https'
import { getContext } from '../module'
import {} from '../utils/telegram/validators'
import { server } from './server'

// TODO: envoyer les messages de payment aux admin
// TODO: prevenir que les run sont reset
export const bot = onRequest(async (req, res) => {
  const { $telegramBot } = getContext()
  const app = await server($telegramBot)
  const request = app(req, res)

  $telegramBot.command('start', async (ctx) => {
    await ctx.replyWithGame('guessprice_bot')
  })

  $telegramBot.on('pre_checkout_query', async (ctx) => {
    console.log('pre_checkout_query', ctx)
    try {
      const payload = JSON.parse(ctx.preCheckoutQuery.invoice_payload)
      console.log('pre_checkout_query:payload', `${payload}`)
      await ctx.answerPreCheckoutQuery(true)
    } catch (error) {
      console.log('error', error)
    }
  })

  $telegramBot.on(':successful_payment', async (ctx) => {
    console.log(':successful_payment', ctx.message)
  })
  return request
})
