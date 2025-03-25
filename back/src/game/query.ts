import type { Firestore } from '@google-cloud/firestore'
import { GuessQuery } from '../game-guess/query'
import { RunQuery } from '../run/query'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { Limit } from '../utils/validators'
import { findBy } from './infra/repository'

export namespace GameQuery {
  export const DEFAULT_WIN_POINTS = Point(100)

  export const getGuesses = (database: Firestore) => async (userId: UserId) => {
    const { remaining } = await RunQuery.get(database)(userId)
    if (remaining === 0) throw new Error('No more remaining guesses')
    const { position } = await findBy(database)(userId)
    return await GuessQuery.getAll(database)(Limit(remaining), position)
  }
}
