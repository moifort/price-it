import type { Bot } from 'grammy'
import type { PaymentId } from '../payment/types'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'
import { Url } from '../utils/validators'

export namespace BotCommand {
  export const createInvoiceLink =
    (bot: Bot) =>
    async (paymentId: PaymentId, userId: UserId, title: string, description: string, amount: TelegramStar) => {
      const link = await bot.api.createInvoiceLink(
        title,
        description,
        JSON.stringify({ paymentId, userId }),
        '',
        'XTR',
        [{ label: title, amount }],
      )
      return Url(link)
    }
}
