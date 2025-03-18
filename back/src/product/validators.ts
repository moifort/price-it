import { make } from 'ts-brand'
import { z } from 'zod'
import type { ProductId as ProductIdType } from './types'

export const ProductId = (value: unknown) => make<ProductIdType>()(z.string().uuid().parse(value))
