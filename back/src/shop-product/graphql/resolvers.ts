import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { Period, ProductId, Category } from '../validators'

const ProductIdScalar = new GraphQLScalarType({
  name: 'ProductId',
  description: 'The `ProductId` scalar type represents a unique identifier for a shop product.',
  parseValue: (value: unknown) => ProductId(value),
  serialize: (value: unknown) => ProductId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? ProductId(ast.value) : null),
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

const CategoryScalar = new GraphQLScalarType({
  name: 'Category',
  description: 'The `Category` scalar type represents product categories: run, time, or score.',
  parseValue: (value: unknown) => Category(value),
  serialize: (value: unknown) => value,
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? Category(ast.value) : null),
})

export const resolvers: Resolvers = {
  ProductId: ProductIdScalar,
  Period: PeriodScalar,
  Category: CategoryScalar,
}
