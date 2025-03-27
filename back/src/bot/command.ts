import type { Bot } from 'grammy'
import type { PaymentId } from '../payment/types'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'
import { Url } from '../utils/validators'
import type { InvoicePayload } from './types'

export namespace BotCommand {
  export const createInvoiceLink =
    (bot: Bot) =>
    async (
      paymentId: PaymentId,
      userId: UserId,
      productId: ProductId,
      title: string,
      description: string,
      amount: TelegramStar,
    ) => {
      const payload: InvoicePayload = { paymentId, userId, productId }
      const link = await bot.api.createInvoiceLink(title, description, JSON.stringify(payload), '', 'XTR', [
        { label: title, amount },
      ])
      return Url(link)
    }
}
