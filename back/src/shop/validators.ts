import { make } from 'ts-brand'
import { z } from 'zod'
import type { ShopProductId as ProductIdType } from './types'

export const ShopProductId = (value: unknown) => make<ProductIdType>()(z.string().min(1).parse(value))
