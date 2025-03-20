import type { Run } from '../run/types'
import type { Period } from '../shop/types'
import type { UserId } from '../user/types'

export namespace BonusCommand {
  export const applyRunBonus = (userId: UserId, total: Run, period: Period) => {
    throw new Error('Not implemented')
  }
}
