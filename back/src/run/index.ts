import { getFirestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { onTaskDispatched } from 'firebase-functions/tasks'
import { $app } from '../index'
import { RunCommand } from './command'
import type { TaskRunReset } from './types'

export const reset = onTaskDispatched<TaskRunReset>(async ({ data }) => {
  const firestore = getFirestore($app)
  const taskQueue = getFunctions($app).taskQueue<TaskRunReset>('run-reset')
  await RunCommand.reset(firestore, taskQueue)(data.userId)
})
