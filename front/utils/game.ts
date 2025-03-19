import _ from 'lodash'
import type { Amount as AmountType } from '../../back/src/utils/types'
import { Amount } from '../../back/src/utils/validators'

/**
 * Generates a display price for guessing game based on actual product price
 * The algorithm creates a price that's sometimes higher, sometimes lower, rarely exact
 */
export const generate = (
  actualPrice: AmountType,
): { displayPrice: AmountType; expectedGuess: 'less' | 'exact' | 'more' } => {
  // Define variation ranges based on price magnitude
  const priceRange = Math.max(10, actualPrice * 0.3) // Min 10 units or 30% of price

  // Determine display price variation
  // 45% chance higher, 45% chance lower, 10% chance exact
  const randomFactor = Math.random()
  if (randomFactor < 0.45) {
    const lowerBound = Math.max(1, actualPrice - priceRange)
    const displayPrice = lowerBound + Math.random() * (actualPrice - lowerBound - 0.01)
    return { displayPrice: Amount(_.round(displayPrice, 0)), expectedGuess: 'more' }
  }
  if (randomFactor < 0.9) {
    const upperBound = actualPrice + priceRange
    const displayPrice = actualPrice + 0.01 + Math.random() * (upperBound - actualPrice - 0.01)
    return { displayPrice: Amount(_.round(displayPrice, 0)), expectedGuess: 'less' }
  }
  return { displayPrice: Amount(_.round(actualPrice, 0)), expectedGuess: 'exact' }
}
