import { describe, expect, it } from 'bun:test'
import { $testFirestore, $testTaskQueue } from '../utils/setup.test'
import { TelegramUserId } from '../utils/telegram/validators'
import { PlayerCommand } from './command'

describe('Player Commands', () => {
  describe('createIfNotExist', () => {
    it('should create a new player with all associated data when user does not exist', async () => {
      // Given
      const userId = TelegramUserId('123456789')
      const firstName = 'John'

      // When
      const exists = await PlayerCommand.createIfNotExist($testFirestore, $testTaskQueue)(userId, firstName)

      // Then
      expect(exists).toBe(false)

      const player = (await $testFirestore.collection('players').doc(userId).get()).data()!
      expect(player).toMatchObject({ id: userId, firstName, score: 0 })
      expect(player.shop).toBeObject()
      expect(player.game).toBeObject()
      expect(player.runs).toBeObject()
      expect(player.affiliation).toBeObject()
      expect(player.task).toBeObject()
    })

    it('should not create anything if user already exists', async () => {
      // Given
      const userId = TelegramUserId('987654321')
      const firstName = 'Jane'
      await $testFirestore.collection('players').doc(userId).create({ id: userId, firstName })

      // When
      const exists = await PlayerCommand.createIfNotExist($testFirestore, $testTaskQueue)(userId, firstName)

      // Then
      expect(exists).toBe(true)
    })
  })
})
