import { initializeApp } from 'firebase-admin/app'
import { TaskQueue } from 'firebase-admin/functions'
import { setGlobalOptions } from 'firebase-functions'

export const $app = initializeApp()

if (process.env.FUNCTIONS_EMULATOR) {
  Object.assign(TaskQueue.prototype, {
    enqueue: (data: unknown, params: unknown) => console.debug('tasks: ', data, params),
  })
}

setGlobalOptions({
  region: 'europe-west3',
  memory: '256MiB',
  serviceAccount: 'function-invoker@price-it-85b3e.iam.gserviceaccount.com',
})

export * from './api'
export * as run from './run'
