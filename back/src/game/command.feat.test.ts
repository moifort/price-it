import { describe, expect, it } from 'bun:test'
import { GuessId } from '../game-guess/validators'
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
          game: {
            winBonus: 0,
            winBonusValidPeriod: 'all-time',
            winBonusExpiredAt: new Date(),
          },
        })

      // When
      await GameCommand.win($testDatabase)(playerId, GuessId('00000000-0000-0000-0000-000000000001'))

      // Then
      const doc = (await $testDatabase.collection('players').doc(playerId).get()).data()!
      expect(doc.score).toBe(1100)
      expect(doc.runs.remaining).toBe(2)
      expect(doc.game.position).toBe('00000000-0000-0000-0000-000000000001')
    })
  })

  describe('lose', () => {
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
          game: {},
        })

      // When
      await GameCommand.lose($testDatabase)(playerId, GuessId('00000000-0000-0000-0000-000000000001'))

      // Then
      const doc = (await $testDatabase.collection('players').doc(playerId).get()).data()!
      expect(doc.score).toBe(1000)
      expect(doc.runs.remaining).toBe(2)
      expect(doc.game.position).toBe('00000000-0000-0000-0000-000000000001')
    })
  })
})
