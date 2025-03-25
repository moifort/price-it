import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'

export namespace PaymentCommand {
  export const sendInvoice =
    (database: Firestore, bot: Bot) =>
    async (userId: UserId, title: string, description: string, amount: TelegramStar) => {
      const invoice = await bot.api.sendInvoice(userId, title, description, '', 'XTR', [{ label: 'XTR', amount }])
      console.log(invoice)
    }
}
