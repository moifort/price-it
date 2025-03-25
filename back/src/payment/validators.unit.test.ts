import { v4 as uuid } from 'uuid'
import { PaymentId, PaymentStatus } from './validators'

describe('PaymentId validator', () => {
  it('should validate a proper UUID', () => {
    const id = uuid()
    expect(() => PaymentId(id)).not.toThrow()
  })

  it('should throw an error for invalid string UUIDs', () => {
    const invalidIds = ['not-uuid', '123', '']
    for (const invalidId of invalidIds) {
      expect(() => PaymentId(invalidId)).toThrow()
    }
  })

  it('should throw an error for non-string inputs', () => {
    expect(() => PaymentId(null as unknown as string)).toThrow()
    expect(() => PaymentId(undefined as unknown as string)).toThrow()
    expect(() => PaymentId(123 as unknown as string)).toThrow()
  })
})

describe('PaymentStatus validator', () => {
  it('should validate valid payment statuses', () => {
    expect(() => PaymentStatus('pending')).not.toThrow()
    expect(() => PaymentStatus('completed')).not.toThrow()
    expect(() => PaymentStatus('failed')).not.toThrow()

    expect(PaymentStatus('pending')).toBe('pending')
    expect(PaymentStatus('completed')).toBe('completed')
    expect(PaymentStatus('failed')).toBe('failed')
  })

  it('should throw an error for invalid status strings', () => {
    const invalidStatuses = ['invalid', 'success', 'processing', '']
    for (const invalidStatus of invalidStatuses) {
      expect(() => PaymentStatus(invalidStatus)).toThrow()
    }
  })

  it('should throw an error for non-string inputs', () => {
    expect(() => PaymentStatus(null)).toThrow()
    expect(() => PaymentStatus(undefined)).toThrow()
    expect(() => PaymentStatus(123)).toThrow()
    expect(() => PaymentStatus({})).toThrow()
    expect(() => PaymentStatus([])).toThrow()
  })
})
