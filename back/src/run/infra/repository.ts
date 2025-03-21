import type { Firestore } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Runs } from '../types'

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const findBy = (db: Firestore) => async (userId: UserId) => {
  const doc = await collection(db).doc(userId).get()
  const player = doc.data()
  if (!player) throw new Error(`Player not found id: ${userId}`)
  return player.runs
}

export const save = (db: Firestore) => (userId: UserId, run: Runs) => update(db)(userId, run)

export const update = (db: Firestore) => async (userId: UserId, run: Partial<Runs>) => {
  if (!(await isExist(db)(userId))) throw new Error(`Player not found id: ${userId}`)
  await collection(db).doc(userId).set({ runs: run }, { merge: true })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
