import type { Score } from '../score/types'
import type { TelegramUserId } from '../utils/telegram/types'

export type PlayerId = TelegramUserId
export type Player = {
  id: PlayerId
  firstName: string
  lastName: string | undefined
  score: Score
}
