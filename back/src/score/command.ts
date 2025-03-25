import type { Firestore } from '@google-cloud/firestore'
import type { UserId } from '../user/types'
import { findBy, increment, update } from './infra/repository'
import type { Point } from './types'
import { Score as ScoreValidator } from './validators'

// TODO: Delete substractPoints
export namespace ScoreCommand {
  export const create = update

  export const addPoints = (database: Firestore) => (userId: UserId, points: Point) =>
    increment(database)(userId, points)

  export const subtractPoints = (database: Firestore) => async (userId: UserId, points: Point) => {
    const currentScore = await findBy(database)(userId)
    const updatedScore = Math.max(0, currentScore - points)
    return create(database)(userId, ScoreValidator(updatedScore))
  }
}
