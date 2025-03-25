import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'
import { InlineKeyboard } from 'grammy'
import { getContext } from '../module'
import { PaymentCommand } from '../payment/command'
import { PaymentQuery } from '../payment/query'
import {} from '../utils/telegram/validators'
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
      reply_markup: new InlineKeyboard().url('🎮 Play', 'tg://resolve?domain=guessprice_bot&appname=game'),
    })
  })

  $telegramBot.on('pre_checkout_query', async (ctx) => {
    console.log('pre_checkout_query', ctx)
    const { paymentId }: InvoicePayload = JSON.parse(ctx.preCheckoutQuery.invoice_payload)
    const isExist = await PaymentQuery.exist($firestore)(paymentId)
    if (!isExist) {
      logger.error(`Pre checkout payment not found, received: ${paymentId}`)
      return
    }
    await ctx.answerPreCheckoutQuery(true)
  })

  $telegramBot.on(':successful_payment', async (ctx) => {
    const payload = ctx.message?.successful_payment?.invoice_payload ?? null
    if (!payload) {
      logger.error(`No payload found, received message: ${ctx.message}`)
      return
    }
    const { paymentId }: InvoicePayload = JSON.parse(payload)
    await PaymentCommand.complete($firestore)(paymentId)
    await ctx.reply('Thank you for your purchase!')
  })

  return request
})
