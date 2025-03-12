import { describe, expect, it } from 'bun:test'
import { Score } from '../../score/validators'
import { $testDatabase } from '../../utils/setup.test'
import { PlayerId } from '../validators'
import { create, findById, isExist } from './repository'

describe('PlayerRepository', () => {
  it('should create a player', async () => {
    // Given
    await create($testDatabase)({
      id: PlayerId('8153383236'),
      firstName: 'John',
      score: Score(0),
    })

    // When
    const doc = await $testDatabase.collection('players').doc('8153383236').get()

    // Then
    expect(doc.exists).toBe(true)
  })

  it('should return true when player exist', async () => {
    // Given
    await $testDatabase.collection('players').doc('8153383236').create({ id: '8153383236' })

    // When
    const exists = await isExist($testDatabase)(PlayerId('8153383236'))

    // Then
    expect(exists).toBe(true)
  })

  it('should get a player by id', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc('8153383237')
      .create({
        id: PlayerId('8153383237'),
        firstName: 'Jane',
        score: Score(10),
      })

    // When
    const result = await findById($testDatabase)(PlayerId('8153383237'))

    // Then
    expect(result).toEqual({
      id: PlayerId('8153383237'),
      firstName: 'Jane',
      score: Score(10),
    })
  })
})
