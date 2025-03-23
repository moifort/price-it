import type { Resolvers } from '../../api/__generated__/types'
import { PlayerCommand } from '../command'
import { PlayerQuery } from '../query'

export const resolvers: Resolvers = {
  Query: {
    me: (_, __, { userId, user, database }) => PlayerQuery.get(database)(userId),
  },
  PlayerMutation: {
    createIfNotExist: (_, __, { user, database, runTaskQueue }) =>
      PlayerCommand.createIfNotExist(database, runTaskQueue)(user.id, user.firstName),
  },
  Mutation: {
    // @ts-ignore
    me: () => ({}),
  },
}
