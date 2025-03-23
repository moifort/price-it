import { describe, expect, it } from 'bun:test'
import { TelegramStar, TelegramToken, TelegramUserId } from './validators'

describe('TelegramToken', () => {
  it('should validate proper Telegram token format', () => {
    expect(() => TelegramToken('123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ')).not.toThrow()
    expect(() => TelegramToken('987654321:ABC123def456GHI789jkl')).not.toThrow()
    expect(() => TelegramToken('1234:ABC-DEF_GHI')).not.toThrow()
  })

  it('should reject invalid Telegram token formats', () => {
    expect(() => TelegramToken('')).toThrow()
    expect(() => TelegramToken('invalid-token')).toThrow()
    expect(() => TelegramToken('123456789ABCDefGhIJKlmNoPQRsTUVwxyZ')).toThrow() // Missing colon
    expect(() => TelegramToken(':ABCDefGhIJKlmNoPQRsTUVwxyZ')).toThrow() // Missing bot ID
    expect(() => TelegramToken('123456789:')).toThrow() // Missing auth token
    expect(() => TelegramToken('abc:DEF123')).toThrow() // Non-numeric bot ID
    expect(() => TelegramToken('123456789:ABC DEF')).toThrow() // Space in auth token
  })
})

describe('TelegramUserId', () => {
  it('should validate positive integer user IDs', () => {
    expect(() => TelegramUserId(123456789)).not.toThrow()
    expect(() => TelegramUserId(9999999999)).not.toThrow()
  })

  it('should validate string user IDs containing only digits', () => {
    expect(() => TelegramUserId('123456789')).not.toThrow()
    expect(() => TelegramUserId('9999999999')).not.toThrow()
  })

  it('should reject negative numbers', () => {
    expect(() => TelegramUserId(-1)).toThrow()
    expect(() => TelegramUserId(-123456789)).toThrow()
  })

  it('should reject zero', () => {
    expect(() => TelegramUserId(0)).toThrow()
  })

  it('should reject non-integer numbers', () => {
    expect(() => TelegramUserId(1.5)).toThrow()
    expect(() => TelegramUserId(123.456)).toThrow()
  })

  it('should reject invalid string inputs', () => {
    expect(() => TelegramUserId('')).toThrow()
    expect(() => TelegramUserId('abc')).toThrow()
    expect(() => TelegramUserId('123abc')).toThrow()
    expect(() => TelegramUserId('123.456')).toThrow()
    expect(() => TelegramUserId('-123')).toThrow()
    expect(() => TelegramUserId('0')).toThrow()
  })
})

describe('TelegramStar', () => {
  it('should validate valid monetary values', () => {
    expect(() => TelegramStar(1)).not.toThrow()
    expect(() => TelegramStar(10)).not.toThrow()
    expect(() => TelegramStar(100)).not.toThrow()
    expect(() => TelegramStar(999999)).not.toThrow()
  })

  it('should reject non-positive values', () => {
    expect(() => TelegramStar(0)).toThrow()
    expect(() => TelegramStar(-1)).toThrow()
    expect(() => TelegramStar(-100)).toThrow()
  })

  it('should reject non-integer values', () => {
    expect(() => TelegramStar(1.5)).toThrow()
    expect(() => TelegramStar(3.7)).toThrow()
  })

  it('should reject non-numeric inputs', () => {
    expect(() => TelegramStar('1')).toThrow()
    expect(() => TelegramStar('money')).toThrow()
    expect(() => TelegramStar(true)).toThrow()
    expect(() => TelegramStar(null)).toThrow()
    expect(() => TelegramStar(undefined)).toThrow()
    expect(() => TelegramStar({})).toThrow()
  })
})
