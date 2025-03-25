import type { Firestore } from '@google-cloud/firestore'
import { RunCommand } from '../run/command'
import type { Task__Run } from '../run/module'
import { Run } from '../run/validators'
import { ProductQuery } from '../shop-product/query'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'

// TODO: Add tests
export namespace ShopCommand {
  export const buy = (database: Firestore, taskQueue: Task__Run) => async (userId: UserId, id: ProductId) => {
    const { quantity, period } = await ProductQuery.getProduct(id)
    await RunCommand.applyRunBonus(database, taskQueue)(userId, Run(quantity), period)
  }
}
