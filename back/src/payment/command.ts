import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import { v4 as uuid } from 'uuid'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'
import { Url } from '../utils/validators'

export namespace PaymentCommand {
  export const createInvoice =
    (database: Firestore, bot: Bot) =>
    async (userId: UserId, title: string, description: string, amount: TelegramStar) => {
      const paymentId = uuid()
      const link = await bot.api.createInvoiceLink(userId, title, description, paymentId, 'XTR', [
        { label: title, amount },
      ])
      return Url(link)
    }
}
