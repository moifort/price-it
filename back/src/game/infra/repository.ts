import type { Firestore } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Game } from '../types'

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const findBy = (db: Firestore) => async (userId: UserId) => {
  const doc = await collection(db).doc(userId).get()
  const player = doc.data()
  if (!player) throw new Error(`Player id ${userId} not found`)
  return player.game
}

export const save = (db: Firestore) => async (userId: UserId) => {
  await collection(db).doc(userId).set({ game: {} }, { merge: true })
}

export const update = (db: Firestore) => async (userId: UserId, game: Partial<Game>) => {
  await collection(db).doc(userId).set({ game: game }, { merge: true })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
