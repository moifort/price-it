import type { Firestore } from 'firebase-admin/firestore'
import { genericDataConverter } from '../../utils/firestore'
import type { Payment, PaymentId } from '../types'

export const save = (db: Firestore) => async (payment: Payment) => collection(db).doc(payment.id).create(payment)

export const update = (db: Firestore) => async (id: PaymentId, payment: Partial<Payment>) =>
  collection(db).doc(id).update(payment)

export const findById = (db: Firestore) => async (id: PaymentId) => {
  const doc = await collection(db).doc(id).get()
  const payment = doc.data()
  if (!payment) throw new Error(`Payment with id ${id} not found`)
  return payment
}

const collection = (db: Firestore) => db.collection('payments').withConverter(genericDataConverter<Payment>())
