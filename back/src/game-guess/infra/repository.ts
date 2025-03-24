import type { Firestore } from 'firebase-admin/firestore'
import { genericDataConverter } from '../../utils/firestore'
import type { Limit } from '../../utils/types'
import type { Guess, GuessId } from '../types'

export const findAll = (db: Firestore) => async (limit: Limit, position?: GuessId) => {
  const query = position
    ? await collection(db).orderBy('id').startAfter(position).limit(limit).get()
    : await collection(db).orderBy('id').limit(limit).get()
  return query.docs.map((doc) => doc.data())
}

const collection = (db: Firestore) => db.collection('guesses').withConverter(genericDataConverter<Guess>())
