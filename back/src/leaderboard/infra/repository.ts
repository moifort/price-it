import type { Firestore } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import { genericDataConverter } from '../../utils/firestore'

export const findPlayersOrderByScore = (db: Firestore) => async (limit: number) => {
  const snapshot = await collection(db).orderBy('score', 'desc').limit(limit).get()
  return snapshot.docs.map((doc) => doc.data())
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
