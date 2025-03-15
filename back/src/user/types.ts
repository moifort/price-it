import type { TelegramUserId } from '../utils/telegram/types'

export type UserId = TelegramUserId
export type User = {
  id: UserId
  firstName: string
  createdAt: Date
}
