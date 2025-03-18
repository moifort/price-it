import type { Database } from '../api/types'
import type { Limit } from '../utils/types'
import { findAll } from './infra/repository'

export namespace ProductQuery {
  export const getAll = (database: Database) => (limit: Limit) => findAll(database)(limit)
}
