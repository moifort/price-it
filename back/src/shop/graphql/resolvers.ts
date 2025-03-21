import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import { v4 as uuid } from 'uuid'
import type { Resolvers } from '../../api/__generated__/types'
import { ShopQuery } from '../query'
import { Period, ShopProductId } from '../validators'

const ShopProductIdScalar = new GraphQLScalarType({
  name: 'ShopProductId',
  description: 'The `ShopProductId` scalar type represents a unique identifier for a shop product.',
  parseValue: (value: unknown) => ShopProductId(value),
  serialize: (value: unknown) => ShopProductId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? ShopProductId(ast.value) : null),
})

const PeriodScalar = new GraphQLScalarType({
  name: 'Period',
  description: 'The `Period` scalar type represents either a minute duration or "all-time".',
  parseValue: (value: unknown) => Period(value),
  serialize: (value: unknown) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) return Period(Number.parseInt(ast.value, 10))
    if (ast.kind === Kind.STRING && ast.value === 'all-time') return 'all-time'
    return null
  },
})

export const resolvers: Resolvers = {
  ShopProductId: ShopProductIdScalar,
  Period: PeriodScalar,
  Query: {
    shopProducts: () => ShopQuery.getProducts(),
  },
  Mutation: {
    buyProduct: async (_, { id }, { database, runTaskQueue, userId }) => {
      const product = ShopQuery.getProducts().find((p) => p.id === id)!
      const paymentId = uuid()
      const paymentUrl = `https://t.me/invoice/${paymentId}?amount=${product.amount}&title=Product Purchase&description=${encodeURIComponent(`Purchase of ${product.quantity} runs for ${product.period === 'all-time' ? 'unlimited time' : `${product.period} minutes`}`)}&payload=${encodeURIComponent(JSON.stringify({ userId, productId: id }))}`

      // You might want to store the pending payment in your database
      // await database.collection('pendingPayments').add({
      //   userId,
      //   productId: id,
      //   paymentId,
      //   amount: product.amount,
      //   status: 'pending',
      //   createdAt: new Date()
      // });

      return paymentUrl
    },
  },
}
