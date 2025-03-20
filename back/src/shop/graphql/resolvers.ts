import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
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
}
