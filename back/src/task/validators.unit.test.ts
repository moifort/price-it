import { describe, expect, it } from 'bun:test'
import { Media } from './validators'

describe('Media', () => {
  it('should validate proper media types', () => {
    expect(() => Media('telegram')).not.toThrow()
    expect(() => Media('youtube')).not.toThrow()
  })

  it('should throw an error for invalid string media types', () => {
    expect(() => Media('invalid')).toThrow()
    expect(() => Media('')).toThrow()
    expect(() => Media('TELEGRAM')).toThrow()
  })

  it('should throw an error for non-string inputs', () => {
    expect(() => Media(null as unknown as string)).toThrow()
    expect(() => Media(undefined as unknown as string)).toThrow()
    expect(() => Media(123 as unknown as string)).toThrow()
    expect(() => Media({} as unknown as string)).toThrow()
    expect(() => Media([] as unknown as string)).toThrow()
    expect(() => Media(true as unknown as string)).toThrow()
  })
})
