import { getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { TaskQueue, getFunctions } from 'firebase-admin/functions'
import { initialize as initializeTaskGame } from '../game/module'
import { initialize as initializeTaskRun } from '../run/module'

export const initialize = (isEmulator: boolean) => {
  const $app = getApp()
  const $firestore = getFirestore($app)
  const $functions = getFunctions($app)
  if (isEmulator) {
    Object.assign(TaskQueue.prototype, {
      enqueue: (data: unknown, params: unknown) => console.debug('tasks: ', data, params),
      delete: (id: unknown) => console.debug('delete task id: ', id),
    })
  }
  const $task__run = initializeTaskRun($functions)
  const $task__game = initializeTaskGame($functions)
  return { $app, $firestore, $functions, $task__run, $task__game }
}
