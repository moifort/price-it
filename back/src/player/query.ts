import type { Database } from '../api/types'
import { findById } from './infra/repository'
import type { PlayerId } from './types'

export namespace PlayerQuery {
  export const get = (database: Database) => async (id: PlayerId) => findById(database)(id)
}
