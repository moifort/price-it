import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { Player, PlayerId } from '../../player/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Point } from '../types'

export const incrementScore = (db: Firestore) => async (playerId: PlayerId, points: Point) => {
  await collection(db)
    .doc(playerId)
    .update({ score: FieldValue.increment(points) })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
