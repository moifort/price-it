import { describe, expect, it } from 'bun:test'
import { ProductId } from './validators'

describe('ProductId', () => {
  it('should accept valid non-empty strings', () => {
    expect(() => ProductId('product123')).not.toThrow()
    expect(() => ProductId('abc-123')).not.toThrow()
    expect(() => ProductId('SKU-ABC-123')).not.toThrow()
  })

  it('should throw error for empty string', () => {
    expect(() => ProductId('')).toThrow()
  })

  it('should throw error for non-string values', () => {
    expect(() => ProductId(123)).toThrow()
    expect(() => ProductId(null)).toThrow()
    expect(() => ProductId(undefined)).toThrow()
    expect(() => ProductId({})).toThrow()
  })
})
