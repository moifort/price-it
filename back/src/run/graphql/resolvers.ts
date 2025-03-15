import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { Minute as MinuteType } from '../../utils/types'
import { Minute } from '../../utils/validators'
import type { Run as RunType } from '../types'
import { Run } from '../validators'

const RunScalar = new GraphQLScalarType({
  name: 'Run',
  description: 'The `Run` scalar type represents run count as a non-negative integer.',
  parseValue: (value: unknown): RunType => Run(value),
  serialize: (value: unknown) => Run(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Run(ast.value) : null),
})

const MinuteScalar = new GraphQLScalarType({
  name: 'Minute',
  description: 'The `Minute` scalar type represents time in minutes as a non-negative integer.',
  parseValue: (value: unknown): MinuteType => Minute(Number(value)),
  serialize: (value: unknown) => Minute(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Minute(Number.parseInt(ast.value, 10)) : null),
})

export const resolvers: Resolvers = {
  Run: RunScalar,
  Minute: MinuteScalar,
}
