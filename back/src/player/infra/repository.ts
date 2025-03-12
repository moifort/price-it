import type { Firestore } from 'firebase-admin/firestore'
import { genericDataConverter } from '../../utils/firestore'
import type { Player, PlayerId } from '../types'

export const isExist = (db: Firestore) => async (playerId: PlayerId) => {
  const doc = await collection(db).doc(playerId).get()
  return doc.exists
}

export const create = (db: Firestore) => async (player: Player) => {
  await collection(db).doc(player.id).create(player)
}

export const findById = (db: Firestore) => async (id: PlayerId) => {
  const doc = await collection(db).doc(id).get()
  const player = doc.data()
  if (!player) throw new Error(`Player not found id: ${id}`)
  return player
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
