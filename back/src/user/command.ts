import type { Firestore } from '@google-cloud/firestore'
import { create as repositoryCreate } from './infra/repository'
import type { UserId } from './types'

// TODO: Add tests
export namespace UserCommand {
  export const create = (database: Firestore) => (id: UserId, firstName: string) =>
    repositoryCreate(database)(id, firstName, new Date())
}
