import { describe, expect, it } from 'bun:test'
import {
  Amount,
  Environment,
  Limit,
  Minute,
  Percentage,
  PercentagePoint,
  Quantity,
  Rank,
  Seconde,
  Url,
} from './validators'

describe('Limit', () => {
  it('should throw if the value is not an integer', () => {
    expect(() => Limit(1.5)).toThrow()
  })

  it('should throw if the value is less than or equal to 0', () => {
    expect(() => Limit(-1)).toThrow()
  })

  it('should throw if the value exceeds 1000', () => {
    expect(() => Limit(1001)).toThrow()
  })

  it('should not throw for a valid limit', () => {
    expect(() => Limit(5)).not.toThrow()
  })
})

describe('Percentage', () => {
  it('should not throw for a valid percentage', () => {
    expect(() => Percentage(0)).not.toThrow()
    expect(() => Percentage(0.5)).not.toThrow()
    expect(() => Percentage(1)).not.toThrow()
  })
})

describe('Amount', () => {
  it('should throw if the value is less than or equal to 0', () => {
    expect(() => Amount(-1)).toThrow()
  })

  it('should not throw for a valid amount', () => {
    expect(() => Amount(0)).not.toThrow()
    expect(() => Amount(100)).not.toThrow()
  })
})

describe('Minute', () => {
  it('should validate positive integers', () => {
    expect(() => Minute(5)).not.toThrow()
    expect(() => Minute(0)).not.toThrow()
    expect(() => Minute(60)).not.toThrow()
  })

  it('should reject negative numbers', () => {
    expect(() => Minute(-1)).toThrow()
    expect(() => Minute(-60)).toThrow()
  })

  it('should reject non-integer numbers', () => {
    expect(() => Minute(1.5)).toThrow()
    expect(() => Minute(0.1)).toThrow()
  })
})

describe('Seconde', () => {
  it('should validate positive integers', () => {
    expect(() => Seconde(5)).not.toThrow()
    expect(() => Seconde(0)).not.toThrow()
    expect(() => Seconde(60)).not.toThrow()
  })

  it('should reject negative numbers', () => {
    expect(() => Seconde(-1)).toThrow()
    expect(() => Seconde(-60)).toThrow()
  })

  it('should reject non-integer numbers', () => {
    expect(() => Seconde(1.5)).toThrow()
    expect(() => Seconde(0.1)).toThrow()
  })
})

describe('PercentagePoint', () => {
  it('should validate percentage points in decimal form', () => {
    expect(() => PercentagePoint(0.05)).not.toThrow() // 5 points
    expect(() => PercentagePoint(0.5)).not.toThrow() // 50 points
    expect(() => PercentagePoint(1)).not.toThrow() // 100 points
  })

  it('should throw error for invalid percentage points', () => {
    expect(() => PercentagePoint(-0.1)).toThrow()
    expect(() => PercentagePoint(1.1)).toThrow()
  })
})

describe('Url', () => {
  it('should validate valid URLs', () => {
    expect(() => Url('https://example.com')).not.toThrow()
    expect(() => Url('http://localhost:3000')).not.toThrow()
    expect(() => Url('https://sub.domain.com/path?query=string')).not.toThrow()
  })

  it('should reject invalid URLs', () => {
    expect(() => Url('not-a-url')).toThrow()
    expect(() => Url('http://')).toThrow()
    expect(() => Url('ftp://invalid-protocol.com')).not.toThrow() // Valid URL with ftp protocol
    expect(() => Url('')).toThrow()
  })
})

describe('Quantity', () => {
  it('should accept valid positive integers', () => {
    expect(() => Quantity(1)).not.toThrow()
    expect(() => Quantity(5)).not.toThrow()
    expect(() => Quantity(100)).not.toThrow()
  })

  it('should throw error for zero', () => {
    expect(() => Quantity(0)).toThrow()
  })

  it('should throw error for negative numbers', () => {
    expect(() => Quantity(-1)).toThrow()
    expect(() => Quantity(-10)).toThrow()
  })

  it('should throw error for non-integer numbers', () => {
    expect(() => Quantity(1.5)).toThrow()
    expect(() => Quantity(0.1)).toThrow()
  })

  it('should throw error for NaN', () => {
    expect(() => Quantity(Number.NaN)).toThrow()
  })
})

describe('Rank', () => {
  it('should create a valid rank', () => {
    const rank = Rank(1)
    expect(Number(rank)).toBe(1)
  })

  it('should throw error for non-integer values', () => {
    expect(() => Rank(1.5)).toThrow('Rank must be an integer')
  })

  it('should throw error for zero or negative values', () => {
    expect(() => Rank(0)).toThrow('Rank must be positive')
    expect(() => Rank(-1)).toThrow('Rank must be positive')
  })
})

describe('Environment', () => {
  it('should validate valid environment values', () => {
    expect(() => Environment('production')).not.toThrow()
    expect(() => Environment('development')).not.toThrow()
    expect(() => Environment('test')).not.toThrow()
  })

  it('should reject invalid environment values', () => {
    expect(() => Environment('staging')).toThrow()
    expect(() => Environment('')).toThrow()
    expect(() => Environment('PRODUCTION')).toThrow() // Case sensitive
  })

  it('should throw with correct error message', () => {
    let errorMessage = ''
    try {
      Environment('invalid')
    } catch (error) {
      errorMessage = (error as Error).message
    }
    expect(errorMessage).toContain('Environment must be one of: production, development, test')
    expect(errorMessage).toContain('Received: invalid')
  })
})
