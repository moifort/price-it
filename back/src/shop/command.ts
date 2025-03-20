import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import { RunCommand } from '../run/command'
import type { TaskRunReset } from '../run/types'
import { Run } from '../run/validators'
import { ScoreCommand } from '../score/command'
import type { UserId } from '../user/types'
import { findProductById } from './infra/repository'
import type { ShopProductId } from './types'

export namespace ShopCommand {
  export const buy =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId, id: ShopProductId) => {
      const { amount, quantity, period } = findProductById(id)
      await RunCommand.applyRunBonus(database, taskQueue)(userId, Run(quantity), period)
      await ScoreCommand.subtractPoints(database)(userId, amount) // Implement no more fund
    }
}
