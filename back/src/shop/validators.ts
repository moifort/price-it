import { make } from 'ts-brand'
import { z } from 'zod'
import { Minute } from '../utils/validators'
import type { Period as PeriodType, ShopProductId as ProductIdType } from './types'

export const ShopProductId = (value: unknown) => make<ProductIdType>()(z.string().min(1).parse(value))

export const Period = (value: unknown): PeriodType => {
  if (typeof value === 'number') return Minute(value)
  if (value === 'all-time') return value
  throw new Error('Period must be a number (minutes) or "all-time"')
}
