import type { Resolvers } from '../../api/__generated__/types'
import { GameCommand } from '../command'
import { GameQuery } from '../query'

export const resolvers: Resolvers = {
  GameQuery: {
    guesses: (_, __, { database, userId }) => GameQuery.getGuesses(database)(userId),
  },
  Query: {
    // @ts-ignore
    game: () => ({}),
  },
  GameMutation: {
    win: async (_, { guessId }, { userId, database }) => {
      await GameCommand.win(database)(userId, guessId)
      return true
    },
    lose: async (_, { guessId }, { userId, database }) => {
      await GameCommand.lose(database)(userId, guessId)
      return true
    },
  },
  Mutation: {
    // @ts-ignore
    game: () => ({}),
  },
}
