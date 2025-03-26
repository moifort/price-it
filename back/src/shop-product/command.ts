import type { Firestore } from '@google-cloud/firestore'
import { RunCommand } from '../run/command'
import type { Task__Run } from '../run/module'
import { Run } from '../run/validators'
import type { UserId } from '../user/types'
import { findById } from './infra/repository'
import type { ProductId } from './types'

// TODO: Add tests
export namespace ProductCommand {
  export const activate = (database: Firestore, taskQueue: Task__Run) => async (userId: UserId, id: ProductId) => {
    const { category, quantity, period } = await findById(id)
    if (category === 'run') {
      await RunCommand.applyRunBonus(database, taskQueue)(userId, Run(quantity), period)
    }
  }
}
