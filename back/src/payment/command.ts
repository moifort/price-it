import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import { v4 as uuid } from 'uuid'
import { BotCommand } from '../bot/command'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'
import { save, update } from './infra/repository'
import type { PaymentId as PaymentIdType } from './types'
import { PaymentId } from './validators'

export namespace PaymentCommand {
  export const create =
    (database: Firestore, bot: Bot) =>
    async (userId: UserId, title: string, description: string, amount: TelegramStar) => {
      const paymentId = PaymentId(uuid())
      const invoiceLink = await BotCommand.createInvoiceLink(bot)(paymentId, userId, title, description, amount)
      await save(database)({
        id: paymentId,
        userId,
        amount,
        status: 'pending',
        invoiceUrl: invoiceLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return invoiceLink
    }

  export const complete = (database: Firestore) => async (paymentId: PaymentIdType) => {
    await update(database)(paymentId, { status: 'completed', updatedAt: new Date() })
  }

  export const fail = (database: Firestore) => async (paymentId: PaymentIdType) => {
    await update(database)(paymentId, { status: 'failed', updatedAt: new Date() })
  }
}
