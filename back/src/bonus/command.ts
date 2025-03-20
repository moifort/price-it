import dayjs from 'dayjs'
import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import { RunCommand } from '../run/command'
import { RunQuery } from '../run/query'
import type { Run as RunType, TaskRunReset } from '../run/types'
import { Run } from '../run/validators'
import type { Period } from '../shop/types'
import type { UserId } from '../user/types'

export namespace BonusCommand {
  export const applyRunBonus =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    async (userId: UserId, quantity: RunType, period: Period) => {
      const totalRuns = RunQuery.getTotalRuns(userId)
      if (period === 'all-time') {
        const renewAt = dayjs().add(RunQuery.getRunPeriod(userId), 'minutes').toDate()
        const totalRun = Run(quantity + totalRuns)
        await RunCommand.set(database, taskQueue)(userId, totalRun, totalRun, renewAt)
        return
      }
      const renewAt = dayjs().add(period, 'minutes').toDate()
      const remaining = Run(quantity + totalRuns)
      await RunCommand.set(database, taskQueue)(userId, remaining, totalRuns, renewAt)
    }
}
