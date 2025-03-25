import type { Brand } from 'ts-brand'
import type { UserId } from '../user/types'
import type { TelegramStar } from '../utils/telegram/types'
import type { Url } from '../utils/types'

export type PaymentId = Brand<string, 'PaymentId'>
export type PaymentStatus = 'pending' | 'completed' | 'failed'

export type Payment = {
  id: PaymentId
  userId: UserId
  amount: TelegramStar
  status: PaymentStatus
  invoiceUrl: Url
  createdAt: Date
  updatedAt: Date
}
