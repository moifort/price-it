import type { Firestore } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Airdrop } from '../types'

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const update = (db: Firestore) => async (userId: UserId, airdrop: Partial<Airdrop>) => {
  if (!(await isExist(db)(userId))) throw new Error(`Player not found id: ${userId}`)
  await collection(db).doc(userId).set({ airdrop }, { merge: true })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
