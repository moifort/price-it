import type { Functions, TaskQueue } from 'firebase-admin/functions'
import type { UserId } from '../user/types'

export type TaskArgs__Game = { userId: UserId }
export type Task__Game = TaskQueue<TaskArgs__Game>

export const initialize = (functions: Functions) => {
  return functions.taskQueue<TaskArgs__Game>('locations/europe-west3/functions/game-onWinBonusExpired')
}
