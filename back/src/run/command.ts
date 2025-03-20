import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { findBy, update } from './infra/repository'
import type { Run, TaskRunReset } from './types'
import { Run as RunValidator } from './validators'

export namespace RunCommand {
  export const set =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    async (userId: UserId, remaining: Run, total: Run, renewAt: Date) => {
      await update(database)(userId, { total, remaining, renewAt })
      await taskQueue.delete(userId)
      await taskQueue.enqueue({ userId: userId }, { scheduleTime: renewAt, id: userId })
    }

  export const decrease = (database: Database) => async (userId: UserId) => {
    const { remaining } = await findBy(database)(userId)
    const updatedRemaining = Math.max(0, remaining - 1)
    await update(database)(userId, { remaining: RunValidator(updatedRemaining) })
  }
}
