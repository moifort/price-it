import type { Database } from '../api/types'
import { Score } from '../score/validators'
import { PlayerRepository } from './infra/repository'
import type { PlayerId } from './types'

export namespace Command {
  export const createIfNotExist = (database: Database) => async (id: PlayerId, firstName: string) => {
    const exists = await PlayerRepository.isExist(database)(id)
    if (!exists) {
      await PlayerRepository.create(database)({
        id,
        firstName,
        score: Score(0),
      })
    }
  }

  export const get = (database: Database) => async (id: PlayerId) => {
    throw new Error('Not implemented')
  }
}
