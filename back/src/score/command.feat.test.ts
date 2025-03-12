import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { $testDatabase } from '../utils/setup.test'
import { ScoreCommand } from './command'
import { Point, Score } from './validators'

describe('ScoreCommand', () => {
  it('addPoints', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc(PlayerId('8153383236'))
      .create({
        id: PlayerId('8153383236'),
        firstName: 'John',
        score: Score(100),
      })

    // When
    await ScoreCommand.addPoints($testDatabase)(PlayerId('8153383236'), Point(50))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('8153383236')).get()
    expect(doc.data()!.score).toBe(150)
  })
})
