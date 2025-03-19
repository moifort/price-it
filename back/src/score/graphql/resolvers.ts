import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { Point as PointType, Score as ScoreType } from '../types'
import { Point, Score } from '../validators'

const ScoreScalar = new GraphQLScalarType({
  name: 'Score',
  description: 'The `Score` scalar type represents total score player is a positive integer.',
  parseValue: (value: unknown): ScoreType => Score(value),
  serialize: (value: unknown) => Score(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Score(ast.value) : null),
})

const PointScalar = new GraphQLScalarType({
  name: 'Point',
  description: 'The `Point` scalar type represents points as a positive integer greater than zero.',
  parseValue: (value: unknown): PointType => Point(value),
  serialize: (value: unknown) => Point(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Point(ast.value) : null),
})

export const resolvers: Resolvers = {
  Score: ScoreScalar,
  Point: PointScalar,
}
