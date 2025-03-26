import type { Firestore } from 'firebase-admin/firestore'
import type { UserId } from '../user/types'
import { increment, update } from './infra/repository'
import { ScoreQuery } from './query'

export namespace ScoreCommand {
  export const create = (firestore: Firestore) => async (userId: UserId) => {
    await update(firestore)(userId, ScoreQuery.DEFAULT_SCORE)
  }

  export const addPoints = increment
}
