import type { Firestore } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { Player } from '../../player/types'
import type { ProductId } from '../../shop-product/types'
import type { UserId } from '../../user/types'
import { genericDataConverter } from '../../utils/firestore'

export const isExist = (db: Firestore) => async (id: UserId) => {
  const doc = await collection(db).doc(id).get()
  return doc.exists
}

export const save = (db: Firestore) => async (userId: UserId) => {
  await collection(db)
    .doc(userId)
    .set({ shop: { purchased: {} } }, { merge: true })
}

export const addPurchased = (db: Firestore) => async (userId: UserId, productId: ProductId) => {
  await collection(db)
    .doc(userId)
    .set({ shop: { purchased: { [productId]: FieldValue.increment(1) } } }, { merge: true })
}

const collection = (db: Firestore) => db.collection('players').withConverter(genericDataConverter<Player>())
