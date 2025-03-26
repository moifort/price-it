import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../../player/validators'
import { Score } from '../../score/validators'
import { $testFirestore } from '../../utils/setup.test'
import { findPlayersOrderByScore } from './repository'

describe('Leaderboard Repository', () => {
  describe('getTopPlayers', () => {
    it('should return players ordered by score with correct rank', async () => {
      // Given
      await $testFirestore
        .collection('players')
        .doc(PlayerId('1111111111'))
        .create({
          id: PlayerId('1111111111'),
          firstName: 'John',
          score: Score(100),
        })
      await $testFirestore
        .collection('players')
        .doc(PlayerId('22222222222'))
        .create({
          id: PlayerId('22222222222'),
          firstName: 'Pierre',
          score: Score(1400),
        })
      await $testFirestore
        .collection('players')
        .doc(PlayerId('33333333333'))
        .create({
          id: PlayerId('33333333333'),
          firstName: 'Paul',
          score: Score(0),
        })

      // When
      const topPlayers = await findPlayersOrderByScore($testFirestore)(2)

      // Then
      expect(topPlayers).toHaveLength(2)
      expect(topPlayers[0].score).toBe(Score(1400))
    })
  })
})
