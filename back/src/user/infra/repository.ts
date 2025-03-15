import type { Firestore } from 'firebase-admin/firestore'
import { genericDataConverter } from '../../utils/firestore'
import type { User, UserId } from '../types'

export const create = (db: Firestore) => async (id: UserId, firstName: string, createdAt: Date) => {
  await collection(db).doc(id).create({ id, firstName, createdAt })
}

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<User>())
