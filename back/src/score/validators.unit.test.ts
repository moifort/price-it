import { describe, expect, it } from 'bun:test'
import { Score } from './validators'

describe('Score', () => {
  it('should accept valid non-negative integers', () => {
    expect(() => Score(0)).not.toThrow()
    expect(() => Score(1)).not.toThrow()
    expect(() => Score(100)).not.toThrow()
  })

  it('should throw error for negative numbers', () => {
    expect(() => Score(-1)).toThrow()
  })

  it('should throw error for non-integer numbers', () => {
    expect(() => Score(1.5)).toThrow()
  })

  it('should throw error for NaN', () => {
    expect(() => Score(Number.NaN)).toThrow()
  })
})
