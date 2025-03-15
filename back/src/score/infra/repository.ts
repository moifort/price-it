import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'
import type { Point, Score } from '../types'

export const set = (db: Firestore) => async (userId: UserId, score: Score) => {
  await collection(db).doc(userId).update({ score })
}

export const increment = (db: Firestore) => async (userId: UserId, points: Point) => {
  await collection(db)
    .doc(userId)
    .update({ score: FieldValue.increment(points) })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
