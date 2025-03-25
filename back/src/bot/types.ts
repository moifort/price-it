import type { PaymentId } from '../payment/types'
import type { UserId } from '../user/types'

export type InvoicePayload = {
  paymentId: PaymentId
  userId: UserId
}
