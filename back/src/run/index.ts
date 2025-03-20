import dayjs from 'dayjs'
import { getFirestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { onTaskDispatched } from 'firebase-functions/tasks'
import { $app } from '../index'
import { RunCommand } from './command'
import { RunQuery } from './query'
import type { TaskRunReset } from './types'

export const RUN_RESET_TASK_QUEUE_URL = 'locations/europe-west3/functions/run-reset'

export const reset = onTaskDispatched<TaskRunReset>(async ({ data }) => {
  const firestore = getFirestore($app)
  const taskQueue = getFunctions($app).taskQueue<TaskRunReset>(RUN_RESET_TASK_QUEUE_URL)
  const [runPeriod, totalRuns] = await Promise.all([
    RunQuery.getRunPeriod(firestore)(data.userId),
    RunQuery.getTotalRuns(firestore)(data.userId),
  ])
  const renewAt = dayjs().add(runPeriod, 'minutes').toDate()
  await RunCommand.set(firestore, taskQueue)(data.userId, totalRuns, totalRuns, renewAt)
})
