import { describe, expect, it } from 'bun:test'
import { ProductId, Category } from './validators'

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

describe('Category', () => {
  it('should accept valid category values', () => {
    expect(() => Category('run')).not.toThrow()
    expect(() => Category('time')).not.toThrow()
    expect(() => Category('score')).not.toThrow()

    expect(Category('run')).toEqual('run')
    expect(Category('time')).toEqual('time')
    expect(Category('score')).toEqual('score')
  })

  it('should throw error for invalid category strings', () => {
    expect(() => Category('invalid')).toThrow('Category must be one of: run, time, score')
    expect(() => Category('')).toThrow('Category must be one of: run, time, score')
  })

  it('should throw error for non-string values', () => {
    expect(() => Category(123)).toThrow('Category must be one of: run, time, score')
    expect(() => Category(null)).toThrow('Category must be one of: run, time, score')
    expect(() => Category(undefined)).toThrow('Category must be one of: run, time, score')
    expect(() => Category({})).toThrow('Category must be one of: run, time, score')
  })
})
