import { GraphQLScalarType, Kind } from 'graphql'
import type { Resolvers } from '../../api/__generated__/types'
import { GameCommand } from '../command'
import { GameQuery } from '../query'
import { UserGuess } from '../validators'

export const resolvers: Resolvers = {
  UserGuess: new GraphQLScalarType({
    name: 'UserGuess',
    description: 'The `UserGuess` scalar type represents user guesses: less, exact, or more.',
    parseValue: (value: unknown) => UserGuess(value),
    serialize: (value: unknown) => value,
    parseLiteral: (ast) => (ast.kind === Kind.STRING ? UserGuess(ast.value) : null),
  }),
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
    guess: async (_, { guessId, userGuess }, { context: { $firestore }, user: { id } }) => {
      return await GameCommand.guess($firestore)(id, guessId, UserGuess(userGuess))
    },
  },
  Mutation: {
    // @ts-ignore
    game: () => ({}),
  },
}
