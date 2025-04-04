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

export const findById = (db: Firestore) => async (id: GuessId) => {
  const doc = await collection(db).doc(id).get()
  const data = doc.data()
  if (!data) throw new Error(`Guess with id ${id} not found`)
  return data
}

const collection = (db: Firestore) => db.collection('guesses').withConverter(genericDataConverter<Guess>())
