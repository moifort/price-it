import type { Firestore } from '@google-cloud/firestore'
import dayjs from 'dayjs'
import { v5 as uuid } from 'uuid'
import type { Period } from '../shop-product/types'
import type { UserId } from '../user/types'
import { findBy, save, update } from './infra/repository'
import type { Task__Run } from './module'
import { RunQuery } from './query'
import type { Run as RunType, Runs } from './types'
import { Run as RunValidator } from './validators'

export namespace RunCommand {
  export const create = (database: Firestore, taskQueue: Task__Run) => async (userId: UserId) => {
    const remaining = RunQuery.DEFAULT_RUN
    const total = RunQuery.DEFAULT_RUN
    const period = RunQuery.DEFAULT_PERIOD
    const renewAt = dayjs().add(period, 'minutes').toDate()
    await save(database)(userId, { remaining, total, period, renewAt })
    const taskId = uuid(`${userId}-${renewAt}`, uuid.URL)
    await taskQueue.enqueue({ userId }, { scheduleTime: renewAt, id: taskId })
  }

  export const set = (database: Firestore, taskQueue: Task__Run) => async (userId: UserId, runs: Partial<Runs>) => {
    const { renewAt, period } = await findBy(database)(userId)
    const taskIdToDelete = uuid(`${userId}-${renewAt}`, uuid.URL)
    await taskQueue.delete(taskIdToDelete)
    const updatedPeriod = runs.period ?? period
    const updatedRenewAt = runs.renewAt ?? dayjs().add(updatedPeriod, 'minutes').toDate()
    await update(database)(userId, { ...runs, period: updatedPeriod, renewAt: updatedRenewAt })
    const taskId = uuid(`${userId}-${updatedRenewAt}`, uuid.URL)
    await taskQueue.enqueue({ userId }, { scheduleTime: updatedRenewAt, id: taskId })
  }

  export const decrease = (database: Firestore) => async (userId: UserId) => {
    const { remaining } = await findBy(database)(userId)
    const updatedRemaining = Math.max(0, remaining - 1)
    await update(database)(userId, { remaining: RunValidator(updatedRemaining) })
  }

  export const applyRunBonus =
    (database: Firestore, taskQueue: Task__Run) => async (userId: UserId, quantity: RunType, period: Period) => {
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
