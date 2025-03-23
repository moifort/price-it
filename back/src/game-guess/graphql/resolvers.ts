import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { GuessId as GuessIdType } from '../types'
import { GuessId } from '../validators'

const GuessIdScalar = new GraphQLScalarType({
  name: 'GuessId',
  description: 'The `GuessId` scalar type represents a unique identifier for a guess.',
  parseValue: (value: unknown): GuessIdType => GuessId(value),
  serialize: (value: unknown) => GuessId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? GuessId(ast.value) : null),
})

export const resolvers: Resolvers = {
  GuessId: GuessIdScalar,
}
