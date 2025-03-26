import type { GuessId } from '../game-guess/types'
import type { Point } from '../score/types'
import type { Period } from '../shop-product/types'

export type Game = {
  position?: GuessId
  winBonus: Point
  winBonusValidPeriod: Period
  winBonusExpiredAt: Date
}
