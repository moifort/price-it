import { describe, expect, it } from 'bun:test'
import { TelegramUserId } from '../../utils/telegram/validators'
import { $testFirestore } from '../../utils/setup.test'
import { addMedia, findBy, isPlayerExist, save } from './repository'
import { Media } from '../validators'
import type { Task } from '../types'

describe('Task Repository', () => {
  describe('isPlayerExist', () => {
    it('should return true if player exists', async () => {
      // Given
      const userId = TelegramUserId('12345')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          firstName: 'John',
          createdAt: new Date(),
          task: { join: [] },
        })

      // When
      const exists = await isPlayerExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(true)
    })

    it('should return false if player does not exist', async () => {
      // Given
      const userId = TelegramUserId('99999')

      // When
      const exists = await isPlayerExist($testFirestore)(userId)

      // Then
      expect(exists).toBe(false)
    })
  })

  describe('findBy', () => {
    it('should return task for existing player', async () => {
      // Given
      const userId = TelegramUserId('12345')
      const task: Task = { join: [Media('telegram')] }
      
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          firstName: 'John',
          createdAt: new Date(),
          task,
        })

      // When
      const result = await findBy($testFirestore)(userId)

      // Then
      expect(result).toEqual(task)
    })

    it('should throw error if player not found', async () => {
      // Given
      const userId = TelegramUserId('99999')

      // When & Then
      await expect(findBy($testFirestore)(userId)).rejects.toThrow('Player not found')
    })
  })

  describe('save', () => {
    it('should save task for player', async () => {
      // Given
      const userId = TelegramUserId('12345')
      const task: Task = { join: [Media('telegram')] }
      
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          firstName: 'John',
          createdAt: new Date(),
        })

      // When
      await save($testFirestore)(userId, task)

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      const player = doc.data()
      expect(player?.task).toEqual(task)
    })
    
    it('should create player with task if player does not exist', async () => {
      // Given
      const userId = TelegramUserId('54321')
      const task: Task = { join: [Media('youtube')] }

      // When
      await save($testFirestore)(userId, task)

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      const player = doc.data()
      expect(player?.task).toEqual(task)
    })
  })

  describe('addMedia', () => {
    it('should add media to player task', async () => {
      // Given
      const userId = TelegramUserId('12345')
      const initialTask: Task = { join: [Media('telegram')] }
      
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({
          id: userId,
          firstName: 'John',
          createdAt: new Date(),
          task: initialTask,
        })

      // When
      await addMedia($testFirestore)(userId, Media('youtube'))

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      const player = doc.data()
      expect(player?.task.join).toEqual([Media('telegram'), Media('youtube')])
    })

    it('should throw error if player does not exist', async () => {
      // Given
      const userId = TelegramUserId('99999')

      // When & Then
      await expect(addMedia($testFirestore)(userId, Media('telegram'))).rejects.toThrow('Player not found')
    })
  })
}) 