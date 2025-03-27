import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { TaskCommand } from '../commmand'
import type { Media as MediaType } from '../types'
import { Media } from '../validators'

const MediaScalar = new GraphQLScalarType({
  name: 'Media',
  description: 'The `Media` scalar type represents a media platform like youtube or telegram.',
  parseValue: (value: unknown): MediaType => Media(value),
  serialize: (value: unknown) => value,
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? Media(ast.value) : null),
})

export const resolvers: Resolvers = {
  Media: MediaScalar,
  TaskMutation: {
    join: (_, { media }, { context: { $firestore }, user: { id } }) =>
      TaskCommand.join($firestore)(id, media)
        .then(() => true)
        .catch(() => false),
  },
  Mutation: {
    // @ts-ignore
    task: () => ({}),
  },
}
