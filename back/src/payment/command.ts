import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import { v4 as uuid } from 'uuid'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'

export namespace PaymentCommand {
  export const sendInvoice =
    (database: Firestore, bot: Bot) =>
    async (userId: UserId, title: string, description: string, amount: TelegramStar) => {
      const paymentId = uuid()
      const invoice = await bot.api.sendInvoice(userId, title, description, paymentId, 'XTR', [
        { label: title, amount },
      ])
      console.log(invoice)
    }
}
