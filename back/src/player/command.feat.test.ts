import { describe, expect, it } from 'bun:test'
import { $testDatabase } from '../utils/setup.test'
import { PlayerCommand } from './command'
import { PlayerId } from './validators'

describe('createIfNotExist', () => {
  it('should create a player when player does not exist', async () => {
    // When
    await PlayerCommand.createIfNotExist($testDatabase)(PlayerId('8153383236'), 'John')

    // Then
    const doc = await $testDatabase.collection('players').doc('8153383236').get()
    expect(doc.exists).toBe(true)
    expect(doc.data()).toEqual({
      id: '8153383236',
      firstName: 'John',
      score: 0,
    })
  })

  it('should do nothing if player exist', async () => {
    // Given
    await $testDatabase.collection('players').doc('8153383236').create({})

    // When
    await PlayerCommand.createIfNotExist($testDatabase)(PlayerId('8153383236'), 'John')

    // Then
    const result = await $testDatabase.collection('players').get()
    expect(result.docs.length).toBe(1)
  })
})
