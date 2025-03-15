import dayjs from 'dayjs'
import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import { BonusQuery } from '../bonus/query'
import type { UserId } from '../user/types'
import { update } from './infra/repository'
import { RunQuery } from './query'
import type { TaskRunReset } from './types'
import { Run } from './validators'

export namespace RunCommand {
  export const reset = (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId) => {
    const [renewalPeriodBonus, totalRunBonus] = await Promise.all([
      BonusQuery.getRunRenewalPeriod(database)(userId),
      BonusQuery.getTotalRuns(database)(userId),
    ])
    const renewAt = dayjs().add(RunQuery.DEFAULT_RUN_PERIOD, 'minutes').add(renewalPeriodBonus, 'minutes').toDate()
    await update(database)(userId, {
      remaining: Run(RunQuery.DEFAULT_RUN + totalRunBonus),
      renewAt,
    })
    await taskQueue.enqueue({ userId: userId }, { scheduleTime: renewAt })
  }
}
