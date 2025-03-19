import type { Resolvers } from '../../api/__generated__/types'
import { GameCommand } from '../command'

export const resolvers: Resolvers = {
  Mutation: {
    win: async (_, __, { userId, database }) => {
      await GameCommand.win(database)(userId)
      return true
    },
    lose: async (_, __, { userId, database }) => {
      await GameCommand.lose(database)(userId)
      return true
    },
  },
}
