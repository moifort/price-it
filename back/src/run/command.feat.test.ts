import { describe, expect, it } from 'bun:test'
import { Timestamp } from '@google-cloud/firestore'
import { PlayerId } from '../player/validators'
import { $testFirestore, $testTaskQueue } from '../utils/setup.test'
import { Minute } from '../utils/validators'
import { RunCommand } from './command'
import { Run } from './validators'

describe('RunCommand', () => {
  describe('create', () => {
    it('should set total and remaining runs and schedule task queue', async () => {
      // Given
      const userId = PlayerId('9876543210')
      await $testFirestore.collection('players').doc(userId).create({ id: userId })
      await RunCommand.create($testFirestore, $testTaskQueue)(userId)

      // When
      await RunCommand.set($testFirestore, $testTaskQueue)(userId, {
        total: Run(20),
        remaining: Run(20),
        period: Minute(120),
      })

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.runs).toEqual({
        total: 20,
        remaining: 20,
        period: Minute(120),
        renewAt: expect.any(Timestamp),
      })
    })
  })

  describe('decrease', () => {
    it('should decrease remaining runs by 1', async () => {
      // Given
      const userId = PlayerId('1234567890')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({ id: userId, runs: { remaining: Run(3) } })

      // When
      await RunCommand.decrease($testFirestore)(userId)

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.runs.remaining).toBe(2)
    })

    it('should not decrease below zero', async () => {
      // Given
      const userId = PlayerId('1234567890')
      await $testFirestore
        .collection('players')
        .doc(userId)
        .create({ id: userId, runs: { remaining: Run(0) } })

      // When
      await RunCommand.decrease($testFirestore)(userId)

      // Then
      const doc = await $testFirestore.collection('players').doc(userId).get()
      expect(doc.data()?.runs.remaining).toBe(0)
    })
  })
})
