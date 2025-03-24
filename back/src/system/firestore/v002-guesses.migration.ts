import { v4 as uuid } from 'uuid'
import type { Migrate } from './migration'
import { guesses } from './v002-guesses.data'

export const migrate: Migrate = async (database) => {
  const batch = database.batch()
  const collection = database.collection('guesses')
  for (const guess of guesses) {
    const id = uuid()
    batch.set(collection.doc(id), { id, ...guess })
  }
  await batch.commit()
}
