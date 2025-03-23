import type { Migrate } from './migration'
import { products } from './v002-guesses.data'

export const migrate: Migrate = async (database) => {
  const batch = database.batch()
  const collection = database.collection('guesses')
  for (const product of products) {
    batch.set(collection.doc(product.id), product)
  }
  await batch.commit()
}
