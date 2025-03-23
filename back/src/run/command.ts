import dayjs from 'dayjs'
import type { TaskQueue } from 'firebase-admin/functions'
import { v5 as uuid } from 'uuid'
import type { Database } from '../api/types'
import type { Period } from '../shop-product/types'
import type { UserId } from '../user/types'
import type { Minute } from '../utils/types'
import { findBy, save, update } from './infra/repository'
import { RunQuery } from './query'
import type { Run, Run as RunType, Runs, TaskRunReset } from './types'
import { Run as RunValidator } from './validators'

// TODO: Add bonus
export namespace RunCommand {
  export const create =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    async (userId: UserId, remaining: Run, total: Run, period: Minute) => {
      const renewAt = dayjs().add(period, 'minutes').toDate()
      await save(database)(userId, { remaining, total, period, renewAt })
      const taskId = uuid(`${userId}-${renewAt}`, uuid.URL)
      await taskQueue.enqueue({ userId }, { scheduleTime: renewAt, id: taskId })
    }

  export const set =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) => async (userId: UserId, runs: Partial<Runs>) => {
      const { renewAt, period } = await findBy(database)(userId)
      const taskIdToDelete = uuid(`${userId}-${renewAt}`, uuid.URL)
      await taskQueue.delete(taskIdToDelete)
      const updatedPeriod = runs.period ?? period
      const updatedRenewAt = runs.renewAt ?? dayjs().add(updatedPeriod, 'minutes').toDate()
      await update(database)(userId, { ...runs, period: updatedPeriod, renewAt: updatedRenewAt })
      const taskId = uuid(`${userId}-${updatedRenewAt}`, uuid.URL)
      await taskQueue.enqueue({ userId }, { scheduleTime: updatedRenewAt, id: taskId })
    }

  export const decrease = (database: Database) => async (userId: UserId) => {
    const { remaining } = await findBy(database)(userId)
    const updatedRemaining = Math.max(0, remaining - 1)
    await update(database)(userId, { remaining: RunValidator(updatedRemaining) })
  }

  export const applyRunBonus =
    (database: Database, taskQueue: TaskQueue<TaskRunReset>) =>
    async (userId: UserId, quantity: RunType, period: Period) => {
      const { total, remaining } = await RunQuery.get(database)(userId)
      if (period === 'all-time') {
        const totalWithBonus = RunValidator(quantity + total)
        await RunCommand.set(database, taskQueue)(userId, { total: totalWithBonus, remaining: totalWithBonus })
        return
      }
      const remainingWithBonus = RunValidator(quantity + remaining)
      await RunCommand.set(database, taskQueue)(userId, { remaining: remainingWithBonus })
    }
}
