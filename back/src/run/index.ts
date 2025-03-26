import { onTaskDispatched } from 'firebase-functions/tasks'
import { getContext } from '../module'
import { RunCommand } from './command'
import type { TaskArgs__Run } from './module'
import { RunQuery } from './query'

export const onRunExpired = onTaskDispatched<TaskArgs__Run>(async ({ data }) => {
  const { $firestore, $task__run } = getContext()
  const { period, total } = await RunQuery.get($firestore)(data.userId)
  await RunCommand.set($firestore, $task__run)(data.userId, { remaining: total, period })
})
