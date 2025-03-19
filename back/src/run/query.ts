import type { UserId } from '../user/types'
import { Minute } from '../utils/validators'
import { Run } from './validators'

export namespace RunQuery {
  export const DEFAULT_RUN = Run(5)
  export const DEFAULT_RUN_PERIOD = Minute(60)

  export const getTotalRuns = (userId: UserId) => DEFAULT_RUN
  export const getRunPeriod = (userId: UserId) => DEFAULT_RUN_PERIOD
}
