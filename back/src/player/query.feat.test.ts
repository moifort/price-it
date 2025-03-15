import { describe, expect, it } from 'bun:test'
import { Run } from '../run/validators'
import { Score } from '../score/validators'
import { $testDatabase } from '../utils/setup.test'
import { Minute } from '../utils/validators'
import { PlayerQuery } from './query'
import { PlayerId } from './validators'

describe('get', () => {
  it('should retrieve a player', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc('8153383238')
      .create({
        id: PlayerId('8153383238'),
        firstName: 'Alice',
        score: Score(15),
        runs: {
          remaining: Run(1),
          total: Run(3),
          renewIn: Minute(45),
        },
      })

    // When
    const player = await PlayerQuery.get($testDatabase)(PlayerId('8153383238'))

    // Then
    expect(player).toEqual({
      id: PlayerId('8153383238'),
      firstName: 'Alice',
      score: Score(15),
      runs: {
        remaining: Run(1),
        total: Run(3),
        renewIn: Minute(45),
      },
    })
  })
})
