import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { TelegramUserId as TelegramUserIdType } from '../../utils/telegram/types'
import { TelegramUserId } from '../../utils/telegram/validators'
import { PlayerCommand } from '../command'
import { PlayerQuery } from '../query'

const PlayerIdScalar = new GraphQLScalarType({
  name: 'PlayerId',
  description: "The `PlayerId` define a unique Telegram player it's a positive integer.",
  parseValue: (value: unknown): TelegramUserIdType => TelegramUserId(value),
  serialize: (value: unknown) => TelegramUserId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? TelegramUserId(ast.value) : null),
})

export const resolvers: Resolvers = {
  PlayerId: PlayerIdScalar,
  Mutation: {
    createPlayerIfNotExist: (_, __, { user, database }) =>
      PlayerCommand.createIfNotExist(database)(user.id, user.firstName),
  },
  Query: {
    me: (_, __, { userId, user, database }) => PlayerQuery.get(database)(userId),
  },
}
