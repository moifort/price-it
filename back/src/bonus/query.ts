import type { Database } from '../api/types'
import { Run } from '../run/validators'
import type { UserId } from '../user/types'
import { Minute } from '../utils/validators'

export namespace BonusQuery {
  export const getRunRenewalPeriod = (database: Database) => async (userId: UserId) => Minute(0)
  export const getTotalRuns = (database: Database) => async (userId: UserId) => Run(0)
}
