import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { Run as RunType } from '../types'
import { Run } from '../validators'

const RunScalar = new GraphQLScalarType({
  name: 'Run',
  description: 'The `Run` scalar type represents run count as a non-negative integer.',
  parseValue: (value: unknown): RunType => Run(value),
  serialize: (value: unknown) => Run(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Run(ast.value) : null),
})

export const resolvers: Resolvers = {
  Run: RunScalar,
}
