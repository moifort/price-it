import { make } from 'ts-brand'
import { z } from 'zod'
import type { ProductId as ProductIdType } from './types'

export const ProductId = (value: unknown) => make<ProductIdType>()(z.string().min(1).parse(value))
