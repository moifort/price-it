import { describe, expect, it } from 'bun:test'
import { $testDatabase } from '../utils/setup.test'
import { Limit } from '../utils/validators'
import { Amount } from '../utils/validators'
import { Url } from '../utils/validators'
import { ProductQuery } from './query'
import { ProductId } from './validators'

describe('ProductQuery', () => {
  it('getAll should return products up to the limit', async () => {
    // Given
    await $testDatabase
      .collection('products')
      .doc(ProductId('f47ac10b-58cc-4372-a567-0e02b2c3d479'))
      .set({
        id: ProductId('f47ac10b-58cc-4372-a567-0e02b2c3d479'),
        name: 'Test Product 1',
        image: Url('https://example.com/image1.jpg'),
        price: Amount(19.99),
        category: 'test',
        url: Url('https://example.com/product1'),
      })
    await $testDatabase
      .collection('products')
      .doc(ProductId('123e4567-e89b-12d3-a456-426614174000'))
      .set({
        id: ProductId('123e4567-e89b-12d3-a456-426614174000'),
        name: 'Test Product 2',
        image: Url('https://example.com/image2.jpg'),
        price: Amount(29.99),
        category: 'test',
        url: Url('https://example.com/product2'),
      })

    // When
    const products = await ProductQuery.getAll($testDatabase)(Limit(1))

    // Then
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Test Product 2')
  })
})
