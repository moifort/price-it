import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import type { Task__Game } from '../game/module'
import { PaymentCommand } from '../payment/command'
import type { Task__Run } from '../run/module'
import { ProductCommand } from '../shop-product/command'
import { ProductQuery } from '../shop-product/query'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'
import { addPurchased, save } from './infra/repository'

// TODO: Add tests
export namespace ShopCommand {
  export const create = save

  export const createInvoice = (database: Firestore, bot: Bot) => async (userId: UserId, id: ProductId) => {
    const { description, name, amount } = await ProductQuery.getProduct(id)
    return PaymentCommand.create(database, bot)(userId, id, name, description, amount)
  }

  export const activateProduct =
    (database: Firestore, runTaskQueue: Task__Run, gameTaskQueue: Task__Game) =>
    async (userId: UserId, productId: ProductId) => {
      await ProductCommand.activate(database, runTaskQueue, gameTaskQueue)(userId, productId)
      await addPurchased(database)(userId, productId, new Date())
    }
}
