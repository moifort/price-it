import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../../player/validators'
import { $testFirestore } from '../../utils/setup.test'
import { Point, Score } from '../validators'
import { increment } from './repository'

describe('Repository', () => {
  it('should add 50 points to the existing score', async () => {
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
    await increment($testFirestore)(PlayerId('8153383236'), Point(50))

    // Then
    const doc = await $testFirestore.collection('players').doc(PlayerId('8153383236')).get()
    expect(doc.data()!.score).toBe(150)
  })
})
