import { describe, expect, it } from 'bun:test'
import { Run } from './validators'

describe('Run', () => {
  it('should accept valid non-negative integers', () => {
    expect(() => Run(0)).not.toThrow()
    expect(() => Run(1)).not.toThrow()
    expect(() => Run(100)).not.toThrow()
  })

  it('should throw error for negative numbers', () => {
    expect(() => Run(-1)).toThrow()
    expect(() => Run(-10)).toThrow()
  })

  it('should throw error for non-integer numbers', () => {
    expect(() => Run(1.5)).toThrow()
    expect(() => Run(0.1)).toThrow()
  })

  it('should throw error for NaN', () => {
    expect(() => Run(Number.NaN)).toThrow()
  })

  it('should throw error for non-number values', () => {
    expect(() => Run('5')).toThrow()
    expect(() => Run(null)).toThrow()
    expect(() => Run(undefined)).toThrow()
    expect(() => Run({})).toThrow()
  })
})
