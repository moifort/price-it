import type { Database } from '../api/types'
import { RunQuery } from '../run/query'
import type { UserId } from '../user/types'
import { Limit } from '../utils/validators'
import { findAll } from './infra/repository'

export namespace GuessQuery {
  export const getAll = (database: Database) => async (userId: UserId) => {
    const { remaining } = await RunQuery.get(database)(userId)
    if (remaining === 0) throw new Error('No more guesses available')
    return await findAll(database)(Limit(remaining))
  }
}
