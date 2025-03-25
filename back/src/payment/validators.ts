import { make } from 'ts-brand'
import { z } from 'zod'
import type { PaymentId as PaymentIdType, PaymentStatus as PaymentStatusType } from './types'

export const PaymentId = (value: unknown) =>
  make<PaymentIdType>()(
    z
      .string()
      .uuid({ message: `PaymentId must be a valid UUID, received: ${value}` })
      .parse(value),
  )

export const PaymentStatus = (value: unknown): PaymentStatusType => {
  const validStatuses: PaymentStatusType[] = ['pending', 'completed', 'failed']
  if (typeof value !== 'string' || !validStatuses.includes(value as PaymentStatusType)) {
    throw new Error(`PaymentStatus must be one of: pending, completed, failed. Received: ${value}`)
  }
  return value as PaymentStatusType
}
