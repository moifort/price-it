import type { Firestore } from 'firebase-admin/firestore'
import { genericDataConverter } from '../../utils/firestore'
import type { Limit } from '../../utils/types'
import type { Guess } from '../types'

// TODO: Add tests
export const findAll = (db: Firestore) => async (limit: Limit) => {
  const snapshot = await collection(db).limit(limit).get()
  return snapshot.docs.map((doc) => doc.data())
}

const collection = (db: Firestore) => db.collection('guesses').withConverter(genericDataConverter<Guess>())
