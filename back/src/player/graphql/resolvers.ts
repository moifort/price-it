import type { Resolvers } from '../../api/__generated__/types'
import { RunQuery } from '../../run/query'
import { Run } from '../../run/validators'
import { PlayerCommand } from '../command'
import { PlayerQuery } from '../query'

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { context: { $firestore }, user: { id } }) => {
      const player = await PlayerQuery.get($firestore)(id)
      return {
        ...player,
        bonus: {
          run: Run(player.runs.total - RunQuery.DEFAULT_RUN),
          win: player.game.winBonus,
          winExpiredAt: player.game.winBonusExpiredAt,
        },
        affiliation: {
          friends: player.affiliation.friends.length,
        },
        task: player.task,
      }
    },
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
