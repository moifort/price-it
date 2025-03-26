import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { $testFirestore } from '../utils/setup.test'
import { AirdropCommand } from './command'
import { WalletId } from './validators'

describe('Airdrop Commands', () => {
  describe('setWalletId', () => {
    it('should update wallet ID for a user', async () => {
      // Given
      await $testFirestore
        .collection('players')
        .doc('2')
        .create({ id: PlayerId('2') })

      // When
      await AirdropCommand.setWalletId($testFirestore)(PlayerId('2'), WalletId('10393884-03982039832'))

      // Then
      const doc = await $testFirestore.collection('players').doc('2').get()
      expect(doc.data()!.airdrop?.walletId).toBe('10393884-03982039832')
    })
  })
})
