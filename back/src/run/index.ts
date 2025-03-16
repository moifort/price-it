import { getFirestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { onTaskDispatched } from 'firebase-functions/tasks'
import { $app } from '../index'
import { RunCommand } from './command'
import type { TaskRunReset } from './types'

export const RUN_RESET_TASK_QUEUE_URL = 'https://europe-west3-price-it-85b3e.cloudfunctions.net/run-reset'
export const reset = onTaskDispatched<TaskRunReset>(async ({ data }) => {
  const firestore = getFirestore($app)
  const taskQueue = getFunctions($app).taskQueue<TaskRunReset>(RUN_RESET_TASK_QUEUE_URL)
  await RunCommand.reset(firestore, taskQueue)(data.userId)
})
