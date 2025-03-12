import { make } from 'ts-brand'
import { z } from 'zod'
import type { TelegramToken as TelegramTokenType, TelegramUserId as TelegramUserIdType } from './telegram.type'

export const TelegramToken = make<TelegramTokenType>((value) =>
  z
    .string()
    .min(1)
    .regex(/^\d+:[A-Za-z0-9_-]+$/, 'Invalid Telegram token format')
    .parse(value),
)
export const TelegramUserId = make<TelegramUserIdType>((value) => z.number().int().positive().parse(value))
