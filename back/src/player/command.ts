import type { Database } from '../api/types'
import { Run } from '../run/validators'
import { Minute } from '../utils/validators'
import { Score } from '../score/validators'
import { create, isExist } from './infra/repository'
import type { PlayerId } from './types'

export namespace PlayerCommand {
  export const createIfNotExist = (database: Database) => async (id: PlayerId, firstName: string) => {
    const exists = await isExist(database)(id)
    if (!exists) await create(database)({
      id,
      firstName,
      score: Score(0),
      runs: {
        remaining: Run(10),
        total: Run(10),
        renewIn: Minute(60)
      }
    })
    return id
  }
}
