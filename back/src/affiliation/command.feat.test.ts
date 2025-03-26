import { describe, expect, it } from 'bun:test'
import { $testFirestore } from '../utils/setup.test'
import { TelegramUserId } from '../utils/telegram/validators'
import { AffiliationCommand } from './command'

describe('AffiliationCommand', () => {
  describe('create', () => {
    it('should initialize empty friends array', async () => {
      // When
      await AffiliationCommand.create($testFirestore)(TelegramUserId('1'))

      // Then
      const snapshot = await $testFirestore.collection('players').doc('1').get()
      expect(snapshot.data()?.affiliation.friends).toEqual([])
    })
  })

  describe('addFriend', () => {
    it('should add a friend to the affiliation', async () => {
      // Given
      await $testFirestore
        .collection('players')
        .doc('1')
        .create({ id: '1', affiliation: { friends: [] } })

      // When
      await AffiliationCommand.addFriend($testFirestore)(TelegramUserId('1'), TelegramUserId('2'))
      await AffiliationCommand.addFriend($testFirestore)(TelegramUserId('1'), TelegramUserId('3'))

      // Then
      const snapshot = await $testFirestore.collection('players').doc('1').get()
      expect(snapshot.data()?.affiliation.friends).toContain('2')
      expect(snapshot.data()?.affiliation.friends).toContain('3')
    })
  })
})
