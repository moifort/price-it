import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { get, increment, set as setRepository } from './infra/repository'
import type { Point, Score } from './types'
import { Score as ScoreValidator } from './validators'

export namespace ScoreCommand {
  export const set = (database: Database) => (userId: UserId, score: Score) => setRepository(database)(userId, score)

  export const addPoints = (database: Database) => (userId: UserId, points: Point) =>
    increment(database)(userId, points)

  export const subtractPoints = (database: Database) => async (userId: UserId, points: Point) => {
    const currentScore = await get(database)(userId)
    const updatedScore = Math.max(0, currentScore - points)
    return set(database)(userId, ScoreValidator(updatedScore))
  }
}
