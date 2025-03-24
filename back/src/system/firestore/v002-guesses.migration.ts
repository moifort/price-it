import { ProductId } from '../../shop-product/validators'
import type { Migrate } from './migration'
import { guesses } from './v002-guesses.data'

export const migrate: Migrate = async (database) => {
  const batch = database.batch()
  const collection = database.collection('guesses')
  for (const product of guesses) {
    const id = ProductId(product.id)
    batch.set(collection.doc(id), product)
  }
  await batch.commit()
}
