import type { Database } from '../api/types'
import type { PlayerId } from '../player/types'
import { incrementScore } from './infra/repository'
import type { Point } from './types'

export namespace ScoreCommand {
  export const addPoints = (database: Database) => (playerId: PlayerId, points: Point) =>
    incrementScore(database)(playerId, points)
}
