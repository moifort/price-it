import { describe, expect, it } from 'bun:test'
import { ProductId } from './validators'

describe('ProductId', () => {
  it('should accept valid UUID strings', () => {
    expect(() => ProductId('123e4567-e89b-12d3-a456-426614174000')).not.toThrow()
    expect(() => ProductId('f47ac10b-58cc-4372-a567-0e02b2c3d479')).not.toThrow()
  })

  it('should throw error for non-UUID strings', () => {
    expect(() => ProductId('abc123')).toThrow()
    expect(() => ProductId('123')).toThrow()
    expect(() => ProductId('')).toThrow()
  })

  it('should throw error for non-string values', () => {
    expect(() => ProductId(123)).toThrow()
    expect(() => ProductId(null)).toThrow()
    expect(() => ProductId(undefined)).toThrow()
    expect(() => ProductId({})).toThrow()
  })
})
