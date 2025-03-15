import dayjs from 'dayjs'
import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import type { UserId } from '../user/types'
import { update } from './infra/repository'
import { RunQuery } from './query'
import type { TaskRunReset } from './types'

export namespace RunCommand {
  export const reset = (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId) => {
    const renewAt = dayjs().add(RunQuery.getRunPeriod(userId), 'minutes').toDate()
    const total = RunQuery.getTotalRuns(userId)
    await update(database)(userId, {
      remaining: RunQuery.getTotalRuns(userId),
      renewAt,
      total,
    })
    await taskQueue.enqueue({ userId: userId }, { scheduleTime: renewAt })
  }
}
