import type { Database } from '../api/types'
import { create as repositoryCreate } from './infra/repository'
import type { UserId } from './types'

export namespace UserCommand {
  export const create = (database: Database) => (id: UserId, firstName: string) =>
    repositoryCreate(database)(id, firstName, new Date())
}
