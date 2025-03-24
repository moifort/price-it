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
      .min(1, { message: `TelegramToken must not be empty, received: ${value}` })
      .regex(/^\d+:[A-Za-z0-9_-]+$/, { message: `TelegramToken must match format "number:token", received: ${value}` })
      .parse(value),
  )

export const TelegramUserId = (value: unknown) =>
  make<TelegramUserIdType>()(
    z.coerce
      .string()
      .refine((val) => /^\d+$/.test(val) && Number.parseInt(val, 10) > 0, {
        message: `TelegramUserId must be a positive integer, received: ${value}`,
      })
      .parse(value),
  )

export const TelegramStar = (value: unknown) =>
  make<TelegramStarType>()(
    z
      .number()
      .int({ message: `TelegramStar must be an integer, received: ${value}` })
      .min(1, { message: `TelegramStar must be at least 1, received: ${value}` })
      .parse(value),
  )
