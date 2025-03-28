import { describe, expect, it } from 'bun:test'
import { Score } from '../score/validators'
import { $testFirestore } from '../utils/setup.test'
import { TelegramUserId } from '../utils/telegram/validators'
import { TaskCommand } from './command'

describe('Task Commands', () => {
  describe('create', () => {
    it('should create a task entry with an empty join array for a user', async () => {
      // Given
      const userId = TelegramUserId('123456789')
      await $testFirestore.collection('players').doc(userId).create({ id: userId })

      // When
      await TaskCommand.create($testFirestore)(userId)

      // Then
      const snapshot = await $testFirestore.collection('players').doc('123456789').get()
      expect(snapshot.data()).toEqual({ id: '123456789', task: { join: [] } })
    })
  })

  describe('join', () => {
    it('should add media to user join array and add 3000 points', async () => {
      // Given
      const userId = TelegramUserId('987654321')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({ id: userId, score: Score(0), task: { join: [] } })

      // When
      await TaskCommand.join($testFirestore)(userId, 'youtube')

      // Then
      const snapshot = await $testFirestore.collection('players').doc(userId).get()
      expect(snapshot.data()).toEqual({
        id: '987654321',
        score: 3000,
        task: { join: ['youtube'] },
      })
    })

    it('should throw an error if user has already joined the media', async () => {
      // Given
      const userId = TelegramUserId('555555555')
      const media = 'youtube' as const
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({ id: userId, task: { join: ['youtube'] } })

      // When & Then
      expect(TaskCommand.join($testFirestore)(userId, media)).rejects.toThrow('Player has already join youtube')
    })
  })
})
