import { describe, expect, it } from 'bun:test'
import { UserGuess } from './validators'

describe('UserGuess', () => {
  it('should validate valid UserGuess values', () => {
    expect(() => UserGuess('less')).not.toThrow()
    expect(() => UserGuess('exact')).not.toThrow()
    expect(() => UserGuess('more')).not.toThrow()
  })

  it('should throw error for invalid UserGuess values', () => {
    expect(() => UserGuess('invalid')).toThrow()
    expect(() => UserGuess('LESS')).toThrow()
    expect(() => UserGuess('EXACT')).toThrow()
    expect(() => UserGuess('MORE')).toThrow()
  })

  it('should throw error for non-string inputs', () => {
    expect(() => UserGuess(null)).toThrow()
    expect(() => UserGuess(undefined)).toThrow()
    expect(() => UserGuess(123)).toThrow()
    expect(() => UserGuess({})).toThrow()
    expect(() => UserGuess([])).toThrow()
  })
})
