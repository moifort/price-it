import { describe, expect, it } from 'bun:test'
import { Score } from '../../score/validators'
import { $testDatabase } from '../../utils/setup.test'
import { PlayerId } from '../validators'
import { create, findById, isExist } from './repository'
import { Run } from '../../run/validators'
import { Minute } from '../../utils/validators'

describe('PlayerRepository', () => {
  it('should create a player', async () => {
    // Given
    await create($testDatabase)({
      id: PlayerId('8153383236'),
      firstName: 'Test',
      score: Score(0),
      runs: {
        remaining: Run(3),
        total: Run(3),
        renewIn: Minute(60)
      }
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
    await $testDatabase.collection('players').doc('8153383237').create({
      id: PlayerId('8153383237'),
      firstName: 'Test',
      score: Score(10),
      runs: {
        remaining: Run(2),
        total: Run(3),
        renewIn: Minute(30)
      }
    })

    // When
    const result = await findById($testDatabase)(PlayerId('8153383237'))

    // Then
    expect(result).toEqual({
      id: PlayerId('8153383237'),
      firstName: 'Test',
      score: Score(10),
      runs: {
        remaining: Run(2),
        total: Run(3),
        renewIn: Minute(30)
      }
    })
  })
})
