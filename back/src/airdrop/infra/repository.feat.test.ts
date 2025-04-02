import { describe, expect, it } from 'bun:test'
import { $testFirestore } from '../../utils/setup.test'
import { TelegramUserId } from '../../utils/telegram/validators'
import type {} from '../types'
import { WalletId } from '../validators'
import { isExist, update } from './repository'

describe('Airdrop Repository', () => {
  describe('isExist', () => {
    it('should return true when player exists', async () => {
      // Given
      const userId = TelegramUserId('123456789')
      await $testFirestore.collection('players').doc(userId).create({ id: userId })

      // When
      const exists = await isExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(true)
    })

    it('should return false when player does not exist', async () => {
      // Given
      const userId = TelegramUserId('987654321')

      // When
      const exists = await isExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(false)
    })
  })

  describe('update', () => {
    it('should update airdrop when player exists', async () => {
      // Given
      const userId = TelegramUserId('123123123')
      await $testFirestore.collection('players').doc(userId).create({ id: userId })

      // When
      await update($testFirestore)(userId, { walletId: WalletId('0x123456789') })

      // Then
      const updatedDoc = await $testFirestore.collection('players').doc(userId).get()
      expect(updatedDoc.data()?.airdrop).toEqual({ walletId: '0x123456789' })
    })

    it('should throw error when player does not exist', async () => {
      // Given
      const userId = TelegramUserId('999999999')

      // When/Then
      expect(update($testFirestore)(userId, { walletId: WalletId('0x123456789') })).rejects.toThrow()
    })
  })
})
