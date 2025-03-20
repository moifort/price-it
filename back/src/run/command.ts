import dayjs from 'dayjs'
import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import type { Period } from '../shop/types'
import type { UserId } from '../user/types'
import type { Minute } from '../utils/types'
import { findBy, update } from './infra/repository'
import { RunQuery } from './query'
import type { Run, Run as RunType, Runs, TaskRunReset } from './types'
import { Run as RunValidator } from './validators'

export namespace RunCommand {
  export const create =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    (userId: UserId, remaining: Run, total: Run, period: Minute) =>
      set(database, taskQueue)(userId, { remaining, total, period })

  export const set =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId, runs: Partial<Runs>) => {
      const period = runs.period ?? (await findBy(database)(userId)).period
      const renewAt = runs.renewAt ?? dayjs().add(period, 'minutes').toDate()
      await update(database)(userId, { ...runs, period, renewAt })
      await taskQueue.delete(userId)
      await taskQueue.enqueue({ userId: userId }, { scheduleTime: renewAt, id: userId })
    }

  export const decrease = (database: Database) => async (userId: UserId) => {
    const { remaining } = await findBy(database)(userId)
    const updatedRemaining = Math.max(0, remaining - 1)
    await update(database)(userId, { remaining: RunValidator(updatedRemaining) })
  }

  export const applyRunBonus =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    async (userId: UserId, quantity: RunType, period: Period) => {
      const totalRuns = await RunQuery.getTotalRuns(database)(userId)
      if (period === 'all-time') {
        const total = RunValidator(quantity + totalRuns)
        await RunCommand.set(database, taskQueue)(userId, { total, remaining: total })
        return
      }
      const remaining = RunValidator(quantity + totalRuns)
      await RunCommand.set(database, taskQueue)(userId, { remaining })
    }
}
