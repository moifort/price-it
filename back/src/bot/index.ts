import { onRequest } from 'firebase-functions/https'
import { getContext } from '../module'
import { PaymentCommand } from '../payment/command'
import { TelegramStar, TelegramUserId } from '../utils/telegram/validators'
import { server } from './server'

export const bot = onRequest(async (req, res) => {
  const { $telegramBot, $firestore } = getContext()
  const app = await server($telegramBot)
  const request = app(req, res)
  $telegramBot.on('message', async (ctx) => {
    console.log(ctx.message)
    await PaymentCommand.createInvoice($firestore, $telegramBot)(
      TelegramUserId(ctx.message.chat.id),
      'Product Name',
      'Product description',
      TelegramStar(1),
    )
    await ctx.reply('Invoice send')
  })

  $telegramBot.command('start', async (ctx) => {
    await ctx.replyWithGame('guessprice_bot')
  })
  $telegramBot.on('pre_checkout_query', async (ctx) => {
    console.log(ctx.message)
    await ctx.reply('En attente de paiement')
  })

  $telegramBot.on(':successful_payment', async (ctx) => {
    console.log(ctx.message)
    await ctx.reply('Merci pour votre paiement')
  })
  return request
})
