import type { Firestore } from '@google-cloud/firestore'
import type { UserId } from '../user/types'
import type { TelegramToken } from '../utils/telegram/types'

export namespace PaymentCommand {
  export const createInvoice = (database: Firestore, telegramToken: TelegramToken) => async (userId: UserId) => {
    throw new Error('Not implemented')
  }
}
