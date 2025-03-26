import type { Firestore } from '@google-cloud/firestore'
import type { UserId } from '../user/types'

export namespace AffiliationCommand {
  export const addFriend = ($firestore: Firestore) => async (userId: UserId, friendId: UserId) => {}
}
