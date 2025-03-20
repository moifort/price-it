import type { Resolvers } from '../../api/__generated__/types'
import { Limit } from '../../utils/validators'
import { LeaderboardQuery } from '../query'

export const resolvers: Resolvers = {
  Query: {
    topPlayers: (_, { limit }, { database }) => LeaderboardQuery.getTopPlayers(database)(Limit(limit)),
  },
}
