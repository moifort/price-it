import { make } from 'ts-brand'
import { z } from 'zod'
import type {
  TelegramStar as TelegramStarType,
  TelegramToken as TelegramTokenType,
  TelegramUserId as TelegramUserIdType,
} from './types'

export const TelegramToken = (value: unknown) =>
  make<TelegramTokenType>()(
    z
      .string()
      .min(1)
      .regex(/^\d+:[A-Za-z0-9_-]+$/, 'Invalid Telegram token format')
      .parse(value),
  )

export const TelegramUserId = (value: unknown) =>
  make<TelegramUserIdType>()(
    z.coerce
      .string()
      .refine((val) => /^\d+$/.test(val) && Number.parseInt(val, 10) > 0, 'Telegram User ID must be a positive integer')
      .parse(value),
  )

export const TelegramStar = (value: unknown) => make<TelegramStarType>()(z.number().int().min(1).parse(value))
