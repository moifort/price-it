import type { PaymentId } from '../payment/types'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'

export type InvoicePayload = {
  paymentId: PaymentId
  productId: ProductId
  userId: UserId
}
