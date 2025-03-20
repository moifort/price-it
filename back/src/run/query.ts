import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { Minute } from '../utils/validators'
import { findBy } from './infra/repository'
import { Run } from './validators'

export namespace RunQuery {
  export const DEFAULT_RUN = Run(5)
  export const DEFAULT_PERIOD = Minute(60)

  export const getTotalRuns = (database: Database) => async (userId: UserId) => {
    const { total } = await findBy(database)(userId)
    return total
  }

  export const getRunPeriod = (database: Database) => async (userId: UserId) => {
    const { period } = await findBy(database)(userId)
    return period
  }
}
