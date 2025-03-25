import type { Resolvers } from '../../api/__generated__/types'
import { PlayerCommand } from '../command'
import { PlayerQuery } from '../query'

export const resolvers: Resolvers = {
  Query: {
    me: (_, __, { context: { $firestore }, user: { id } }) => PlayerQuery.get($firestore)(id),
  },
  PlayerMutation: {
    createIfNotExist: (_, __, { context: { $firestore, $task__run }, user: { id, firstName } }) =>
      PlayerCommand.createIfNotExist($firestore, $task__run)(id, firstName),
  },
  Mutation: {
    // @ts-ignore
    me: () => ({}),
  },
}
