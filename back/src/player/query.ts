import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { findById } from './infra/repository'

export namespace PlayerQuery {
  export const get = (database: Database) => async (id: UserId) => findById(database)(id)
}
