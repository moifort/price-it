import { describe, expect, it } from 'bun:test'
import { PlayerId } from '../../player/validators'
import { ProductId } from '../../shop-product/validators'
import { $testDatabase } from '../../utils/setup.test'
import { addPurchased, isExist, save } from './repository'

describe('Shop Repository', () => {
  it('should check if user exists', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc('8153383236')
      .create({ id: '8153383236', shop: { purchased: {} } })

    // When
    const exists = await isExist($testDatabase)(PlayerId('8153383236'))

    // Then
    expect(exists).toBe(true)
  })

  it('should return false if user does not exist', async () => {
    // When
    const exists = await isExist($testDatabase)(PlayerId('9999999999'))

    // Then
    expect(exists).toBe(false)
  })

  it('should save a new shop entry for a user', async () => {
    // Given
    await $testDatabase.collection('players').doc('7123456789').create({ id: '7123456789' })

    // When
    await save($testDatabase)(PlayerId('7123456789'))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('7123456789')).get()
    expect(doc.data()!.shop).toEqual({ purchased: {} })
  })

  it('should add a purchased product to the user', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc('6123456789')
      .create({ id: '6123456789', shop: { purchased: {} } })

    // When
    await addPurchased($testDatabase)(PlayerId('6123456789'), ProductId('product-123'))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('6123456789')).get()
    expect(doc.data()!.shop.purchased).toEqual({ 'product-123': 1 })
  })

  it('should increment the count of a previously purchased product', async () => {
    // Given
    await $testDatabase
      .collection('players')
      .doc('5123456789')
      .create({ id: '5123456789', shop: { purchased: { 'product-456': 1 } } })

    // When
    await addPurchased($testDatabase)(PlayerId('5123456789'), ProductId('product-456'))

    // Then
    const doc = await $testDatabase.collection('players').doc(PlayerId('5123456789')).get()
    expect(doc.data()!.shop.purchased).toEqual({ 'product-456': 2 })
  })
})
