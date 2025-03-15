import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { TelegramUserId as TelegramUserIdType } from '../../utils/telegram/types'
import { TelegramUserId } from '../../utils/telegram/validators'

const UserIdScalar = new GraphQLScalarType({
  name: 'UserId',
  description: "The `UserId` define a unique Telegram user it's a positive integer.",
  parseValue: (value: unknown): TelegramUserIdType => TelegramUserId(value),
  serialize: (value: unknown) => TelegramUserId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? TelegramUserId(ast.value) : null),
})

export const resolvers: Resolvers = {
  UserId: UserIdScalar,
}
