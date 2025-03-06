import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { Score as ScoreType } from '../types'
import { Score } from '../validators'

const ScoreScalar = new GraphQLScalarType({
  name: 'Score',
  description: 'The `Score` scalar type represents total score player is a positive integer.',
  parseValue: (value: unknown): ScoreType => Score(value),
  serialize: (value: unknown) => Score(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Score(ast.value) : null),
})

export const resolvers: Resolvers = {
  Score: ScoreScalar,
  Query: {
    currentScore: () => Score(0),
  },
}
