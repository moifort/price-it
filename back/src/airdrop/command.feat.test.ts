import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { $testDatabase } from '../utils/setup.test'
import { AirdropCommand } from './command'
import { WalletId } from './validators'

describe('Airdrop Commands', () => {
  describe('setWalletId', () => {
    it('should update wallet ID for a user', async () => {
      // Given
      await $testDatabase
        .collection('players')
        .doc('123456789')
        .create({ id: PlayerId('123456789') })

      // When
      await AirdropCommand.setWalletId($testDatabase)(PlayerId('123456789'), WalletId('10393884-03982039832'))

      // Then
      const doc = await $testDatabase.collection('players').doc('123456789').get()
      expect(doc.data()!.airdrop?.walletId).toBe('10393884-03982039832')
    })
  })
})
