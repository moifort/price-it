import type { Firestore } from '@google-cloud/firestore'
import type { Bot } from 'grammy'
import { PaymentCommand } from '../payment/command'
import { ProductQuery } from '../shop-product/query'
import type { ProductId } from '../shop-product/types'
import type { UserId } from '../user/types'

// TODO: Add tests
export namespace ShopCommand {
  export const createInvoice = (database: Firestore, bot: Bot) => async (userId: UserId, id: ProductId) => {
    const { description, name, amount } = await ProductQuery.getProduct(id)
    return PaymentCommand.create(database, bot)(userId, name, description, amount)
  }
}
