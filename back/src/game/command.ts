import type { Database } from '../api/types'
import type { GuessId } from '../game-guess/types'
import { RunCommand } from '../run/command'
import { ScoreCommand } from '../score/command'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { save, update } from './infra/repository'
import { GameQuery } from './query'

export namespace GameCommand {
  export const create = save
  export const set = update

  export const win = (database: Database) => async (userId: UserId, guessId: GuessId) => {
    await Promise.all([
      update(database)(userId, { position: guessId }),
      ScoreCommand.addPoints(database)(userId, Point(GameQuery.DEFAULT_WIN_POINTS)),
      RunCommand.decrease(database)(userId),
    ])
  }

  export const lose = (database: Database) => (userId: UserId, guessId: GuessId) =>
    Promise.all([update(database)(userId, { position: guessId }), RunCommand.decrease(database)(userId)])
}
