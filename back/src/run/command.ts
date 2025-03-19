import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { update } from './infra/repository'
import type { Run, TaskRunReset } from './types'

export namespace RunCommand {
  export const set =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId, total: Run, renewAt: Date) => {
      await update(database)(userId, { total, remaining: total, renewAt })
      await taskQueue.enqueue({ userId: userId }, { scheduleTime: renewAt })
    }
}
