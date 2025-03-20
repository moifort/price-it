import { describe, expect, it } from 'bun:test'
import { Timestamp } from '@google-cloud/firestore'
import { PlayerId } from '../player/validators'
import { $testDatabase, $testTaskQueue } from '../utils/setup.test'
import { RunCommand } from './command'
import { Run } from './validators'

describe('RunCommand', () => {
  describe('set', () => {
    it('should set total and remaining runs and schedule task queue', async () => {
      // Given
      const userId = PlayerId('9876543210')
      await $testDatabase.collection('players').doc(userId).create({ id: userId })

      // When
      await RunCommand.set($testDatabase, $testTaskQueue)(userId, Run(5), Run(5), new Date('2025-01-01T12:00:00Z'))

      // Then
      const doc = await $testDatabase.collection('players').doc(userId).get()
      expect(doc.data()!.runs).toEqual({
        total: 5,
        remaining: Run(5),
        renewAt: Timestamp.fromDate(new Date('2025-01-01T12:00:00Z')),
      })
    })
  })

  describe('decrease', () => {
    it('should decrease remaining runs by 1', async () => {
      // Given
      const userId = PlayerId('1234567890')
      await $testDatabase
        .collection('players')
        .doc(userId)
        .create({ id: userId, runs: { remaining: Run(3) } })

      // When
      await RunCommand.decrease($testDatabase)(userId)

      // Then
      const doc = await $testDatabase.collection('players').doc(userId).get()
      expect(doc.data()!.runs.remaining).toBe(2)
    })

    it('should not decrease below zero', async () => {
      // Given
      const userId = PlayerId('1234567890')
      await $testDatabase
        .collection('players')
        .doc(userId)
        .create({ id: userId, runs: { remaining: Run(0) } })

      // When
      await RunCommand.decrease($testDatabase)(userId)

      // Then
      const doc = await $testDatabase.collection('players').doc(userId).get()
      expect(doc.data()!.runs.remaining).toBe(0)
    })
  })
})
