import type { Resolvers } from '../../api/__generated__/types'
import { ShopCommand } from '../command'
import { ShopQuery } from '../query'

export const resolvers: Resolvers = {
  ShopQuery: {
    products: () => ShopQuery.getProducts(),
  },
  ShopMutation: {
    createInvoice: (_, { productId }, { context: { $firestore, $telegramBot }, user: { id } }) =>
      ShopCommand.createInvoice($firestore, $telegramBot)(id, productId),
  },
  Query: {
    // @ts-ignore
    shop: () => ({}),
  },
}
