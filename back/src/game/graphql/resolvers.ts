import type { Resolvers } from '../../api/__generated__/types'
import { GameCommand } from '../command'
import { GameQuery } from '../query'

export const resolvers: Resolvers = {
  GameQuery: {
    guesses: (_, __, { context: { $firestore }, user: { id } }) => GameQuery.getGuesses($firestore)(id),
  },
  Query: {
    // @ts-ignore
    game: () => ({}),
  },
  GameMutation: {
    win: async (_, { guessId }, { context: { $firestore }, user: { id } }) => {
      await GameCommand.win($firestore)(id, guessId)
      return true
    },
    lose: async (_, { guessId }, { context: { $firestore }, user: { id } }) => {
      await GameCommand.lose($firestore)(id, guessId)
      return true
    },
  },
  Mutation: {
    // @ts-ignore
    game: () => ({}),
  },
}
