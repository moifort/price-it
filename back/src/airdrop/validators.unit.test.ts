import { describe, expect, it } from 'bun:test'
import { validateWalletId } from './validators'

describe('Validators', () => {
  describe('validateWalletId', () => {
    it('should validate a valid wallet ID', () => {
      expect(() => validateWalletId('wallet123')).not.toThrow()
      expect(() => validateWalletId('0x1234567890abcdef')).not.toThrow()
      expect(() => validateWalletId('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).not.toThrow()
    })

    it('should throw error for empty wallet ID', () => {
      expect(() => validateWalletId('')).toThrow()
      expect(() => validateWalletId(null)).toThrow()
      expect(() => validateWalletId(undefined)).toThrow()
    })

    it('should throw error for non-string wallet ID', () => {
      expect(() => validateWalletId(123)).toThrow()
      expect(() => validateWalletId({})).toThrow()
      expect(() => validateWalletId([])).toThrow()
    })
  })
})
