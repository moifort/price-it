import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Affiliation } from '../types'

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const save = (db: Firestore) => async (userId: UserId, affiliation: Affiliation) => {
  await collection(db).doc(userId).set({ affiliation }, { merge: true })
}

export const addFriend = (db: Firestore) => async (userId: UserId, friendId: UserId) => {
  if (!(await isExist(db)(userId))) throw new Error(`Player not found id: ${userId}`)
  await collection(db)
    .doc(userId)
    .update({
      'affiliation.friends': FieldValue.arrayUnion(friendId),
    })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
