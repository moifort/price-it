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
  // Determine appropriate rounding precision based on price magnitude
  const getRoundingPrecision = (price: number): number => {
    if (price >= 1000000) return 100000 // Round to nearest 100,000 for prices >= 1M
    if (price >= 100000) return 10000 // Round to nearest 10,000 for prices >= 100K
    if (price >= 10000) return 1000 // Round to nearest 1,000 for prices >= 10K
    if (price >= 1000) return 100 // Round to nearest 100 for prices >= 1K
    return 1 // Round to nearest 1 for smaller prices
  }

  const precision = getRoundingPrecision(actualPrice)

  // Define variation ranges based on price magnitude
  const priceRange = Math.max(precision, actualPrice * 0.3) // Min precision units or 30% of price

  // Determine display price variation
  // 45% chance higher, 45% chance lower, 10% chance exact
  const randomFactor = Math.random()
  if (randomFactor < 0.45) {
    const lowerBound = Math.max(precision, actualPrice - priceRange)
    const displayPrice = lowerBound + Math.random() * (actualPrice - lowerBound - 0.01)
    const roundedDown = Math.floor(_.round(displayPrice, 0))
    return {
      displayPrice: Amount(roundedDown - (roundedDown % precision)),
      expectedGuess: 'more',
    }
  }
  if (randomFactor < 0.9) {
    const upperBound = actualPrice + priceRange
    const displayPrice = actualPrice + 0.01 + Math.random() * (upperBound - actualPrice - 0.01)
    const roundedDown = Math.floor(_.round(displayPrice, 0))
    return {
      displayPrice: Amount(roundedDown - (roundedDown % precision)),
      expectedGuess: 'less',
    }
  }
  return {
    displayPrice: Amount(_.round(actualPrice, 0)),
    expectedGuess: 'exact',
  }
}
