import type { Database } from '../api/types'
import { ScoreCommand } from '../score/command'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { GameQuery } from './query'

export namespace GameCommand {
  export const win = (database: Database) => (userId: UserId) =>
    ScoreCommand.addPoints(database)(userId, Point(GameQuery.DEFAULT_WIN_POINTS))

  export const lose = (database: Database) => (userId: UserId) =>
    ScoreCommand.subtractPoints(database)(userId, GameQuery.DEFAULT_LOSE_POINTS)
}
