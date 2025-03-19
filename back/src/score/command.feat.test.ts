import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../player/validators'
import { $testDatabase } from '../utils/setup.test'
import { ScoreCommand } from './command'
import { Point, Score } from './validators'

describe('ScoreCommand', () => {
  it('setScore', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc(PlayerId('9876543210'))
      .create({
        id: PlayerId('9876543210'),
        firstName: 'Jane',
        score: Score(50),
      })

    // When
    await ScoreCommand.set($testDatabase)(PlayerId('9876543210'), Score(10))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('9876543210')).get()
    expect(doc.data()!.score).toBe(10)
  })

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

  it('subtractPoints - normal case', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc(PlayerId('1234567890'))
      .create({
        id: PlayerId('1234567890'),
        firstName: 'Alice',
        score: Score(100),
      })

    // When
    await ScoreCommand.subtractPoints($testDatabase)(PlayerId('1234567890'), Point(30))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('1234567890')).get()
    expect(doc.data()!.score).toBe(70)
  })

  it('subtractPoints - does not go below zero', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc(PlayerId('5555555555'))
      .create({
        id: PlayerId('5555555555'),
        firstName: 'Bob',
        score: Score(20),
      })

    // When
    await ScoreCommand.subtractPoints($testDatabase)(PlayerId('5555555555'), Point(50))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('5555555555')).get()
    expect(doc.data()!.score).toBe(0) // Should not go below 0
  })
})
