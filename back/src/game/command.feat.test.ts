import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { Run } from '../run/validators'
import { Score } from '../score/validators'
import { $testDatabase } from '../utils/setup.test'
import { GameCommand } from './command'

describe('GameCommand', () => {
  describe('win', () => {
    it('should add default win points to the user score and decrease run', async () => {
      // Given
      const playerId = PlayerId('9876543210')
      await $testDatabase
        .collection('players')
        .doc(playerId)
        .create({
          id: playerId,
          firstName: 'Jane',
          score: Score(1000),
          runs: { remaining: Run(3) },
        })

      // When
      await GameCommand.win($testDatabase)(playerId)

      // Then
      const doc = await $testDatabase.collection('players').doc(playerId).get()
      expect(doc.data()!.score).toBe(1100)
      expect(doc.data()!.runs.remaining).toBe(2)
    })
  })
})
