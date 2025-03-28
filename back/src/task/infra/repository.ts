import type { Firestore } from '@google-cloud/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Media, Task } from '../types'

export const isPlayerExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const findBy = (db: Firestore) => async (userId: UserId) => {
  const doc = await collection(db).doc(userId).get()
  const player = doc.data()
  if (!player) throw new Error(`Player not found id: ${userId}`)
  return player.task
}

export const save = (db: Firestore) => async (userId: UserId, task: Task) => {
  await collection(db).doc(userId).set({ task }, { merge: true })
}

export const addMedia = (db: Firestore) => async (userId: UserId, media: Media) => {
  if (!(await isPlayerExist(db)(userId))) throw new Error(`Player not found id: ${userId}`)
  await collection(db)
    .doc(userId)
    .update({
      'task.join': FieldValue.arrayUnion(media),
    })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
