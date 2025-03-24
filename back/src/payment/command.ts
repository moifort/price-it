import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import type { TelegramToken } from '../utils/telegram/types'

export namespace PaymentCommand {
  export const createInvoice = (database: Database, telegramToken: TelegramToken) => async (userId: UserId) => {
    throw new Error('Not implemented')
  }
}
