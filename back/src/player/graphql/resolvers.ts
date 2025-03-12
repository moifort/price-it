import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { Score } from '../../score/validators'
import type { TelegramUserId as TelegramUserIdType } from '../../utils/telegram/types'
import { TelegramUserId } from '../../utils/telegram/validators'
import { Command } from '../command'
import { PlayerId } from '../validators'

const PlayerIdScalar = new GraphQLScalarType({
  name: 'PlayerId',
  description: "The `PlayerId` define a unique Telegram player it's a positive integer.",
  parseValue: (value: unknown): TelegramUserIdType => TelegramUserId(value),
  serialize: (value: unknown) => TelegramUserId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? TelegramUserId(ast.value) : null),
})

export const resolvers: Resolvers = {
  PlayerId: PlayerIdScalar,
  Query: {
    me: async (_, __, { userId, user, database }) => {
      await Command.createIfNotExist(database)(userId, user.firstName)
      return {
        id: PlayerId(userId),
        firstName: user.firstName,
        score: Score(1983),
      }
    },
  },
}
