import type { Functions, TaskQueue } from 'firebase-admin/functions'
import type { UserId } from '../user/types'

export type TaskArgs__Run = { userId: UserId }
export type Task__Run = TaskQueue<TaskArgs__Run>

export const initialize = (functions: Functions) => {
  return functions.taskQueue<TaskArgs__Run>('locations/europe-west3/functions/run-reset')
}
