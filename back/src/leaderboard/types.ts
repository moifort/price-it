import type { Score } from '../score/types'
import type { UserId } from '../user/types'

// TODO: add Rank type utility
export type TopPlayer = {
  rank: number
  id: UserId
  name: string
  score: Score
}
