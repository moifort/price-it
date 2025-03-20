import { describe, expect, it } from 'bun:test'
import { ShopProductId } from './validators'

describe('ProductId', () => {
  it('should accept valid non-empty strings', () => {
    expect(() => ShopProductId('product123')).not.toThrow()
    expect(() => ShopProductId('abc-123')).not.toThrow()
    expect(() => ShopProductId('SKU-ABC-123')).not.toThrow()
  })

  it('should throw error for empty string', () => {
    expect(() => ShopProductId('')).toThrow()
  })

  it('should throw error for non-string values', () => {
    expect(() => ShopProductId(123)).toThrow()
    expect(() => ShopProductId(null)).toThrow()
    expect(() => ShopProductId(undefined)).toThrow()
    expect(() => ShopProductId({})).toThrow()
  })
})
