import { beforeEach, describe, expect, it } from 'bun:test'
import { $testDatabase } from '../../utils/setup.test'
import { Amount, Limit, Url } from '../../utils/validators'
import { GuessId } from '../validators'
import { findAll } from './repository'

describe('findAll', () => {
  beforeEach(async () => {
    await $testDatabase
      .collection('guesses')
      .doc('00000000-0000-0000-0000-000000000001')
      .set({
        id: GuessId('00000000-0000-0000-0000-000000000001'),
        name: 'Product 1',
        description: 'Description 1',
        image: Url('https://example.com/image1.jpg'),
        price: Amount(1000),
        category: 'Category 1',
        url: Url('https://example.com/product1'),
      })
    await $testDatabase
      .collection('guesses')
      .doc('00000000-0000-0000-0000-000000000002')
      .set({
        id: GuessId('00000000-0000-0000-0000-000000000002'),
        name: 'Product 2',
        description: 'Description 2',
        image: Url('https://example.com/image2.jpg'),
        price: Amount(2000),
        category: 'Category 2',
        url: Url('https://example.com/product2'),
      })
    await $testDatabase
      .collection('guesses')
      .doc('00000000-0000-0000-0000-000000000003')
      .set({
        id: GuessId('00000000-0000-0000-0000-000000000003'),
        name: 'Product 3',
        description: 'Description 3',
        image: Url('https://example.com/image3.jpg'),
        price: Amount(3000),
        category: 'Category 3',
        url: Url('https://example.com/product3'),
      })
  })

  it('should find guesses with pagination limit', async () => {
    // When
    const results = await findAll($testDatabase)(Limit(2))

    // Then
    expect(results).toHaveLength(2)
    expect(results[0].id).toEqual(GuessId('00000000-0000-0000-0000-000000000001'))
    expect(results[1].id).toEqual(GuessId('00000000-0000-0000-0000-000000000002'))
  })

  it('should find guesses with pagination after a position', async () => {
    // When - Get with pagination starting after guess2
    const results = await findAll($testDatabase)(Limit(5), GuessId('00000000-0000-0000-0000-000000000002'))

    // Then
    expect(results).toHaveLength(1)
    expect(results[0].id).toEqual(GuessId('00000000-0000-0000-0000-000000000003'))
  })
})
