import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { $testFirestore } from '../utils/setup.test'
import { ScoreCommand } from './command'
import { Point, Score } from './validators'

describe('ScoreCommand', () => {
  it('set', async () => {
    // Given
    await $testFirestore
      .collection('players')
      .doc(PlayerId('9876543210'))
      .create({
        id: PlayerId('9876543210'),
        firstName: 'Jane',
        score: Score(50),
      })

    // When
    await ScoreCommand.create($testFirestore)(PlayerId('9876543210'))

    // Then
    const doc = await $testFirestore.collection('players').doc(PlayerId('9876543210')).get()
    expect(doc.data()!.score).toBe(0)
  })

  it('addPoints', async () => {
    // Given
    await $testFirestore
      .collection('players')
      .doc(PlayerId('8153383236'))
      .create({
        id: PlayerId('8153383236'),
        firstName: 'John',
        score: Score(100),
      })

    // When
    await ScoreCommand.addPoints($testFirestore)(PlayerId('8153383236'), Point(50))

    // Then
    const doc = await $testFirestore.collection('players').doc(PlayerId('8153383236')).get()
    expect(doc.data()?.score).toBe(150)
  })
})
