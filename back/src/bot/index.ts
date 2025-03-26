import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'
import { getContext } from '../module'
import { PaymentCommand } from '../payment/command'
import { PaymentQuery } from '../payment/query'
import { server } from './server'
import type { InvoicePayload } from './types'

// TODO: envoyer les messages de payment aux admin
// TODO: prevenir que les run sont reset
// TODO: pas de message quand achat failed doit implementer un cron ou task pour les passer a failed
export const bot = onRequest(async (req, res) => {
  const { $telegramBot, $firestore } = getContext()
  const app = await server($telegramBot)
  const request = app(req, res)

  $telegramBot.command('start', async (ctx) => {
    await ctx.reply('Welcome! Click below to launch the game 👇', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎮 Play', web_app: { url: 'https://price-it-85b3e.web.app/' } }],
          [{ text: '📢 Subscribe to the channel', url: 'https://t.me/guess_price' }],
        ],
      },
    })
  })

  $telegramBot.on('pre_checkout_query', async (ctx) => {
    const { paymentId }: InvoicePayload = JSON.parse(ctx.preCheckoutQuery.invoice_payload)
    const isExist = await PaymentQuery.exist($firestore)(paymentId)
    if (!isExist) {
      logger.error(`Pre checkout payment not found, received: ${paymentId}`)
      return
    }
    await ctx.answerPreCheckoutQuery(true)
  })

  $telegramBot.on(':successful_payment', async (ctx) => {
    try {
      const payload = ctx.message?.successful_payment?.invoice_payload ?? null
      if (!payload) {
        logger.error(`No payload found, received message: ${ctx.message}`)
        return
      }
      const { paymentId }: InvoicePayload = JSON.parse(payload)
      await PaymentCommand.complete($firestore)(paymentId)
      await ctx.reply('Thank you for your purchase!')
    } catch (error) {
      logger.error(`:successful_payment, error: ${error}`)
    }
  })

  return request
})
