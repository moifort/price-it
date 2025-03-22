import type { Firestore } from 'firebase-admin/firestore'
import type { UserId } from '../user/types'
import { update } from './infra/repository'
import type { WalletId } from './types'

// TODO: rajouter les tests
export namespace AirdropCommand {
  export const setWalletId = (db: Firestore) => (userId: UserId, walletId: WalletId) => update(db)(userId, { walletId })
}
