import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { increment, set } from './infra/repository'
import { ScoreQuery } from './query'
import type { Point } from './types'

export namespace ScoreCommand {
  export const setScore = (database: Database) => (userId: UserId) => set(database)(userId, ScoreQuery.DEFAULT_SCORE)

  export const addPoints = (database: Database) => (userId: UserId, points: Point) =>
    increment(database)(userId, points)

  export const subtractPoints = (database: Database) => (userId: UserId, points: Point) => {
    // TODO
  }
}
