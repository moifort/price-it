import { GuessId } from '../../game-guess/validators'
import type { Migrate } from './migration'
import { guesses } from './v002-guesses.data'

export const migrate: Migrate = async (database) => {
  const batch = database.batch()
  const collection = database.collection('guesses')
  for (const guess of guesses) {
    const id = GuessId(guess.id)
    batch.set(collection.doc(id), guess)
  }
  await batch.commit()
}
