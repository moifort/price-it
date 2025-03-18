import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { Limit } from '../../utils/validators'
import { ProductQuery } from '../query'
import type { ProductId as ProductIdType } from '../types'
import { ProductId } from '../validators'

const ProductIdScalar = new GraphQLScalarType({
  name: 'ProductId',
  description: 'The `ProductId` scalar type represents a unique identifier for a product.',
  parseValue: (value: unknown): ProductIdType => ProductId(value),
  serialize: (value: unknown) => ProductId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? ProductId(ast.value) : null),
})

export const resolvers: Resolvers = {
  ProductId: ProductIdScalar,
  Query: {
    products: (_, { limit }, { database }) => ProductQuery.getAll(database)(Limit(limit)),
  },
}
