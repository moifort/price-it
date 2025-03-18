import { logger } from 'firebase-functions'
import type { Migrate } from './migration'
import { products } from './v002-products.data'

export const migrate: Migrate = async (database) => {
  logger.log(`Migrating v002-products - adding ${products.length} products to Firestore`)
  const batch = database.batch()
  const collection = database.collection('products')
  for (const product of products) {
    batch.set(collection.doc(product.id), product)
  }
  await batch.commit()
  logger.log(`Successfully added ${products.length} products to Firestore`)
}
