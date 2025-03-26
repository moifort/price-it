import type { Firestore } from '@google-cloud/firestore'
import { GameCommand } from '../game/command'
import type { Task__Game } from '../game/module'
import { RunCommand } from '../run/command'
import type { Task__Run } from '../run/module'
import { Run } from '../run/validators'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { findById } from './infra/repository'
import type { ProductId } from './types'

// TODO: Add tests
export namespace ProductCommand {
  export const activate =
    (database: Firestore, runTaskQueue: Task__Run, gameTaskQueue: Task__Game) =>
    async (userId: UserId, id: ProductId) => {
      const { category, quantity, period } = await findById(id)
      if (category === 'run') {
        await RunCommand.applyRunBonus(database, runTaskQueue)(userId, Run(quantity), period)
        return
      }
      if (category === 'score') {
        await GameCommand.applyWinBonus(database, gameTaskQueue)(userId, Point(quantity), period)
        return
      }
    }
}
