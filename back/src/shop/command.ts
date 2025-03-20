import type { Database } from '../api/types'
import { BonusCommand } from '../bonus/command'
import { Run } from '../run/validators'
import { ScoreCommand } from '../score/command'
import type { UserId } from '../user/types'
import { findProductById } from './infra/repository'
import type { ShopProductId } from './types'

export namespace ShopCommand {
  export const buy = (database: Database) => async (userId: UserId, id: ShopProductId) => {
    const { amount, quantity, period } = findProductById(id)
    await BonusCommand.applyRunBonus(database)(userId, Run(quantity), period)
    await ScoreCommand.subtractPoints(database)(userId, amount) // Implement no more fund
  }
}
