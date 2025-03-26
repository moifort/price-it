import { onDocumentUpdated } from 'firebase-functions/firestore'
import { getContext } from '../module'
import type { Payment } from '../payment/types'
import { ShopCommand } from './command'

export const onPaymentUpdate = onDocumentUpdated('payments/{paymentId}', async (event) => {
  const before = event.data!.before.data() as Payment
  const after = event.data!.after.data() as Payment
  if (before.status === 'pending' && after.status === 'completed') {
    const { $firestore, $task__run, $task__game } = getContext()
    await ShopCommand.activateProduct($firestore, $task__run, $task__game)(after.userId, after.productId)
  }
})
