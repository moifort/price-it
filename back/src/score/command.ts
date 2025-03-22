import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { findBy, increment, update } from './infra/repository'
import type { Point, Score } from './types'
import { Score as ScoreValidator } from './validators'

// TODO: Delete substractPoints
export namespace ScoreCommand {
  export const create = (database: Database) => (userId: UserId, score: Score) => update(database)(userId, score)

  export const addPoints = (database: Database) => (userId: UserId, points: Point) =>
    increment(database)(userId, points)

  export const subtractPoints = (database: Database) => async (userId: UserId, points: Point) => {
    const currentScore = await findBy(database)(userId)
    const updatedScore = Math.max(0, currentScore - points)
    return create(database)(userId, ScoreValidator(updatedScore))
  }
}
