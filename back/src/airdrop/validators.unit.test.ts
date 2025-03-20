import { describe, expect, it } from 'bun:test'
import { WalletId } from './validators'

describe('Validators', () => {
  describe('validateWalletId', () => {
    it('should validate a valid wallet ID', () => {
      expect(() => WalletId('wallet123')).not.toThrow()
      expect(() => WalletId('0x1234567890abcdef')).not.toThrow()
      expect(() => WalletId('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).not.toThrow()
    })

    it('should throw error for empty wallet ID', () => {
      expect(() => WalletId('')).toThrow()
      expect(() => WalletId(null)).toThrow()
      expect(() => WalletId(undefined)).toThrow()
    })

    it('should throw error for non-string wallet ID', () => {
      expect(() => WalletId(123)).toThrow()
      expect(() => WalletId({})).toThrow()
      expect(() => WalletId([])).toThrow()
    })
  })
})
