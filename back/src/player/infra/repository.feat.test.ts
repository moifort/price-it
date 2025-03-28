import { describe, expect, it } from 'bun:test'
import { Score } from '../../score/validators'
import { $testFirestore } from '../../utils/setup.test'
import { TelegramUserId } from '../../utils/telegram/validators'
import { findById } from './repository'

describe('Player Repository', () => {
  describe('findById', () => {
    it('should return a player when found', async () => {
      // Given
      const playerId = TelegramUserId('1111111111')
      const mockedPlayer = {
        id: playerId,
        firstName: 'John',
        createdAt: new Date(),
        score: Score(100),
        runs: [],
        airdrop: {},
        game: {},
        shop: {},
        affiliation: {},
        task: {},
      }

      await $testFirestore.collection('players').doc(playerId).create(mockedPlayer)

      // When
      const player = await findById($testFirestore)(playerId)

      // Then
      expect(player).toBeDefined()
      expect(player.id).toBe(playerId)
      expect(player.firstName).toBe('John')
      expect(player.score).toBe(Score(100))
    })

    it('should throw an error when player is not found', async () => {
      // Given
      const nonExistentPlayerId = TelegramUserId('9999999999')

      // When / Then
      await expect(findById($testFirestore)(nonExistentPlayerId)).rejects.toThrow(
        `Player not found id: ${nonExistentPlayerId}`,
      )
    })
  })
})
