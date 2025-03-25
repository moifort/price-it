import type { Firestore } from '@google-cloud/firestore'
import type { UserId } from '../user/types'
import { findById } from './infra/repository'

// TODO: Add tests
export namespace PlayerQuery {
  export const get = (database: Firestore) => async (id: UserId) => findById(database)(id)
}
