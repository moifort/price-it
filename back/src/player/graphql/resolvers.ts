import type { Resolvers } from '../../api/__generated__/types'
import { PlayerCommand } from '../command'
import { PlayerQuery } from '../query'

export const resolvers: Resolvers = {
  Mutation: {
    createPlayerIfNotExist: (_, __, { user, database, runTaskQueue }) =>
      PlayerCommand.createIfNotExist(database, runTaskQueue)(user.id, user.firstName),
  },
  Query: {
    me: (_, __, { userId, user, database }) => PlayerQuery.get(database)(userId),
  },
}
