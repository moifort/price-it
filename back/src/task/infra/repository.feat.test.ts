import { describe, expect, it } from 'bun:test'
import { $testFirestore } from '../../utils/setup.test'
import { TelegramUserId } from '../../utils/telegram/validators'
import type {} from '../types'
import { addMedia, findBy, isPlayerExist, save } from './repository'

describe('Task Repository', () => {
  describe('isPlayerExist', () => {
    it('should return true when player exists', async () => {
      // Given
      const userId = TelegramUserId('1234567890')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          task: { join: [] },
        })

      // When
      const exists = await isPlayerExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(true)
    })

    it('should return false when player does not exist', async () => {
      // Given
      const userId = TelegramUserId('9876543210')

      // When
      const exists = await isPlayerExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(false)
    })
  })

  describe('findBy', () => {
    it('should return task for a given user', async () => {
      // Given
      const userId = TelegramUserId('1234567890')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          task: { join: ['telegram'] },
        })

      // When
      const task = await findBy($testFirestore)(userId)

      // Then
      expect(task).toEqual({ join: ['telegram'] })
    })

    it('should throw an error when player does not exist', async () => {
      // Given
      const userId = TelegramUserId('9876543210')

      // When / Then
      expect(findBy($testFirestore)(userId)).rejects.toThrow()
    })
  })

  describe('save', () => {
    it('should save task for a given user', async () => {
      // Given
      const userId = TelegramUserId('1234567890')
      await $testFirestore.collection('players').doc(userId).create({ id: userId })

      // When
      await save($testFirestore)(userId, { join: [] })

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.task).toEqual({ join: [] })
    })
  })

  describe('addMedia', () => {
    it('should add media to a task join array', async () => {
      // Given
      const userId = TelegramUserId('1234567890')

      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          task: { join: ['telegram'] },
        })

      // When
      await addMedia($testFirestore)(userId, 'youtube')

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.task).toEqual({ join: ['telegram', 'youtube'] })
    })

    it('should throw an error when player does not exist', async () => {
      expect(addMedia($testFirestore)(TelegramUserId('9876543210'), 'youtube')).rejects.toThrow()
    })

    it('should not add duplicate media to the join array', async () => {
      // Given
      const userId = TelegramUserId('1234567890')

      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          task: { join: ['telegram'] },
        })

      // When
      await addMedia($testFirestore)(userId, 'telegram')

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.task).toEqual({ join: ['telegram'] })
    })
  })
})
