import type { Firestore } from '@google-cloud/firestore'
import { Rank } from '../utils/validators'
import { findPlayersOrderByScore } from './infra/repository'
import type { TopPlayer } from './types'

export namespace LeaderboardQuery {
  export const getTopPlayers = (database: Firestore) => async (limit: number) => {
    const players = await findPlayersOrderByScore(database)(limit)
    return players.map<TopPlayer>(({ id, firstName, score }, index) => ({
      rank: Rank(index + 1),
      id,
      name: firstName,
      score,
    }))
  }
}
