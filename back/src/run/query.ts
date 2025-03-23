import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { Minute } from '../utils/validators'
import { findBy } from './infra/repository'
import { Run } from './validators'

export namespace RunQuery {
  export const DEFAULT_RUN = Run(10)
  export const DEFAULT_PERIOD = Minute(3 * 60)

  export const get = (database: Database) => async (userId: UserId) => findBy(database)(userId)
}
