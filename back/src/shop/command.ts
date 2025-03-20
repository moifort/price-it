import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import type { ShopProductId } from './types'

export namespace ShopCommand {
  export const buy = (database: Database) => (userId: UserId, id: ShopProductId) => {
    // Is product Id exists or throw error use repository in Infra folder
    // fetch product details
    // add to Player collection shop: { updatedAt, products : [bought product] }
    // apply run bonus
    // remove points to score ScoreCommand.subtractPoints
  }
}
