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
    await PaymentCommand.sendInvoice($firestore, $telegramBot)(
      TelegramUserId(ctx.message.chat.id),
      'Product Name',
      'Product description',
      TelegramStar(10),
    )
    await ctx.reply('Invoice send')
  })

  $telegramBot.on(':successful_payment', async (ctx) => {
    console.log(ctx.message)
    await ctx.reply(`Merci pour votre paiement ${ctx.message}`)
  })
  return request
})
