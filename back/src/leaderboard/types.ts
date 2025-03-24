import type { Score } from '../score/types'
import type { UserId } from '../user/types'
import type { Rank } from '../utils/types'

// TODO: add Rank type utility
export type TopPlayer = {
  rank: Rank
  id: UserId
  name: string
  score: Score
}
