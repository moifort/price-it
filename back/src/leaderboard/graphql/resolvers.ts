import type { Resolvers } from '../../api/__generated__/types'
import { Limit } from '../../utils/validators'
import { LeaderboardQuery } from '../query'

export const resolvers: Resolvers = {
  LeaderboardQuery: {
    topPlayers: (_, { limit }, { context: { $firestore } }) => LeaderboardQuery.getTopPlayers($firestore)(Limit(limit)),
  },
  Query: {
    // @ts-ignore
    leaderboard: () => ({}),
  },
}
