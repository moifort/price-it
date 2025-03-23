import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import { RunCommand } from '../run/command'
import type { TaskRunReset } from '../run/types'
import { Run } from '../run/validators'
import { ScoreCommand } from '../score/command'
import { ProductQuery } from '../shop-product/query'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'

// TODO: Add tests
export namespace ShopCommand {
  export const buy =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId, id: ProductId) => {
      const { amount, quantity, period } = await ProductQuery.getProduct(id)
      await RunCommand.applyRunBonus(database, taskQueue)(userId, Run(quantity), period)
      await ScoreCommand.subtractPoints(database)(userId, amount)
    }
}
