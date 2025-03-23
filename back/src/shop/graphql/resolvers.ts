import type { Resolvers } from '../../api/__generated__/types'
import { ShopQuery } from '../query'

export const resolvers: Resolvers = {
  ShopQuery: {
    products: () => ShopQuery.getProducts(),
  },
  Query: {
    // @ts-ignore
    shop: () => ({}),
  },
  // Mutation: {
  // // TODO: remove this function
  // buyProduct: async (_, { id }, { database, runTaskQueue, userId }) => {
  //   const product = ShopQuery.getProducts().find((p) => p.id === id)!
  //   const paymentId = uuid()
  //   const paymentUrl = `https://t.me/invoice/${paymentId}?amount=${product.amount}&title=Product Purchase&description=${encodeURIComponent(`Purchase of ${product.quantity} runs for ${product.period === 'all-time' ? 'unlimited time' : `${product.period} minutes`}`)}&payload=${encodeURIComponent(JSON.stringify({ userId, productId: id }))}`
  //
  //   // You might want to store the pending payment in your database
  //   // await database.collection('pendingPayments').add({
  //   //   userId,
  //   //   productId: id,
  //   //   paymentId,
  //   //   amount: product.amount,
  //   //   status: 'pending',
  //   //   createdAt: new Date()
  //   // });
  //
  //   return paymentUrl
  // },
  // },
}
