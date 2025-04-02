import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'
import { InlineKeyboard } from 'grammy'
import { AffiliationCommand } from '../affiliation/command'
import { getContext } from '../module'
import { PaymentCommand } from '../payment/command'
import { PaymentQuery } from '../payment/query'
import { ShopCommand } from '../shop/command'
import { UserQuery } from '../user/query'
import { TelegramUserId } from '../utils/telegram/validators'
import { server } from './server'
import type { InvoicePayload } from './types'

// TODO: envoyer les messages de payment aux admin
// TODO: prevenir que les run sont reset
// TODO: pas de message quand achat failed doit implementer un cron ou task pour les passer a failed
export const bot = onRequest(async (req, res) => {
  const { $telegramBot, $firestore, $task__run, $task__game } = getContext()
  const app = await server($telegramBot)
  const request = app(req, res)

  $telegramBot.command('start', async (ctx) => {
    await ctx.reply('Welcome! Click below to launch the game 👇', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎮 Play', url: 'https://t.me/PriceItGameBot/game' }],
          [{ text: '📢 Subscribe to the channel', url: 'https://t.me/guess_price' }],
        ],
      },
    })
    const args = ctx.match?.toString() || ''
    if (args.startsWith('ref_')) {
      const referrerId = TelegramUserId(args.split('_')[1])
      const friendId = TelegramUserId(ctx.from?.id)
      if (await UserQuery.isExist($firestore)(friendId)) {
        logger.warn(`Friend ${friendId} has already an account`)
        return
      }
      await AffiliationCommand.addFriend($firestore)(referrerId, friendId)
      await ctx.reply('Welcome! Your friend will get points once you start to play.')
    }
  })

  $telegramBot.command('play', async (ctx) => {
    const keyboard = new InlineKeyboard()
      .game('Play now!')
      .row()
      .text('Leaderboard', 'leaderboard')
      .text('About', 'about')
    await ctx.replyWithGame('settle_mints_game', {
      reply_markup: keyboard,
      protect_content: true,
      disable_notification: true,
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
    const payload = ctx.message?.successful_payment?.invoice_payload ?? null
    if (!payload) {
      logger.error(`No payload found, received message: ${ctx.message}`)
      return
    }
    const { paymentId, userId, productId }: InvoicePayload = JSON.parse(payload)
    await PaymentCommand.complete($firestore)(paymentId)
    await ShopCommand.activateProduct($firestore, $task__run, $task__game)(userId, productId)
    await ctx.reply('🎉 Thank you for your purchase!')
  })

  return request
})
