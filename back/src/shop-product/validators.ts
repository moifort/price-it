import { make } from 'ts-brand'
import { z } from 'zod'
import { Minute } from '../utils/validators'
import type { Category as CategoryType, Period as PeriodType, ProductId as ProductIdType } from './types'

export const ProductId = (value: unknown) => make<ProductIdType>()(z.string().min(1).parse(value))
export const Period = (value: unknown): PeriodType => {
  if (typeof value === 'number') return Minute(value)
  if (value === 'all-time') return value
  throw new Error('Period must be a number (minutes) or "all-time"')
}

export const Category = (value: unknown): CategoryType => {
  const categories: CategoryType[] = ['run', 'time', 'score']
  if (typeof value !== 'string' || !categories.includes(value as CategoryType)) {
    throw new Error('Category must be one of: run, time, score')
  }
  return value as CategoryType
}
