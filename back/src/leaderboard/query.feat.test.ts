import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { Score } from '../score/validators'
import { $testDatabase } from '../utils/setup.test'
import { LeaderboardQuery } from './query'

describe('LeaderboardQuery', () => {
  describe('getTopPlayers', () => {
    it('should return top players ordered by score', async () => {
      // Given
      await $testDatabase
        .collection('players')
        .doc(PlayerId('1111111111'))
        .create({
          id: PlayerId('1111111111'),
          firstName: 'John',
          score: Score(100),
        })
      await $testDatabase
        .collection('players')
        .doc(PlayerId('22222222222'))
        .create({
          id: PlayerId('22222222222'),
          firstName: 'Pierre',
          score: Score(1400),
        })
      await $testDatabase
        .collection('players')
        .doc(PlayerId('33333333333'))
        .create({
          id: PlayerId('33333333333'),
          firstName: 'Paul',
          score: Score(0),
        })

      // When
      const topPlayers = await LeaderboardQuery.getTopPlayers($testDatabase)(2)

      // Then
      expect(topPlayers).toHaveLength(2)
      expect(topPlayers[0].score).toBe(Score(1400))
    })
  })
})
