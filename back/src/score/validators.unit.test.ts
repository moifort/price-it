import { describe, expect, it } from 'bun:test'
import { Point, Score } from './validators'

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

describe('Point', () => {
  it('should accept valid positive integers', () => {
    expect(() => Point(1)).not.toThrow()
    expect(() => Point(5)).not.toThrow()
    expect(() => Point(100)).not.toThrow()
  })

  it('should throw error for zero', () => {
    expect(() => Point(0)).toThrow()
  })

  it('should throw error for negative numbers', () => {
    expect(() => Point(-1)).toThrow()
    expect(() => Point(-10)).toThrow()
  })

  it('should throw error for non-integer numbers', () => {
    expect(() => Point(1.5)).toThrow()
    expect(() => Point(0.1)).toThrow()
  })

  it('should throw error for NaN', () => {
    expect(() => Point(Number.NaN)).toThrow()
  })

  it('should throw error for non-number values', () => {
    expect(() => Point('5')).toThrow()
    expect(() => Point(null)).toThrow()
    expect(() => Point(undefined)).toThrow()
    expect(() => Point({})).toThrow()
  })
})
