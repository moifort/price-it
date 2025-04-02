import type { Firestore } from 'firebase-admin/firestore'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Player } from '../types'

export const findById = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  const player = doc.data()
  if (!player) throw new Error(`Player not found id: ${id}`)
  return player
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
