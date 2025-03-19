import type { Database } from '../api/types'
import { RunCommand } from '../run/command'
import { ScoreCommand } from '../score/command'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { GameQuery } from './query'

export namespace GameCommand {
  export const win = (database: Database) => async (userId: UserId) => {
    await Promise.all([
      ScoreCommand.addPoints(database)(userId, Point(GameQuery.DEFAULT_WIN_POINTS)),
      RunCommand.decrease(database)(userId)
    ])
  }

  export const lose = (database: Database) => async (userId: UserId) => {
    await Promise.all([
      ScoreCommand.subtractPoints(database)(userId, GameQuery.DEFAULT_LOSE_POINTS),
      RunCommand.decrease(database)(userId)
    ])
  }
}
