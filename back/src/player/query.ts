import type { Firestore } from '@google-cloud/firestore'
import type { UserId } from '../user/types'
import { findById } from './infra/repository'

export namespace PlayerQuery {
  export const get = (database: Firestore) => async (id: UserId) => findById(database)(id)
}
