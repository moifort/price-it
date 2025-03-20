import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { ShopQuery } from '../query'
import { ShopProductId } from '../validators'

const ShopProductIdScalar = new GraphQLScalarType({
  name: 'ShopProductId',
  description: 'The `ShopProductId` scalar type represents a unique identifier for a shop product.',
  parseValue: (value: unknown) => ShopProductId(value),
  serialize: (value: unknown) => ShopProductId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? ShopProductId(ast.value) : null),
})

export const resolvers: Resolvers = {
  ShopProductId: ShopProductIdScalar,
  Query: {
    shopProducts: () => ShopQuery.getProducts(),
  },
}
