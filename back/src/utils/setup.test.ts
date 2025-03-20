import { afterEach, beforeAll } from 'bun:test'
import { type RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import type { Firestore } from '@google-cloud/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { TaskQueue } from 'firebase-admin/functions'
import type { TaskRunReset } from '../run/types'

let database: Firestore | undefined
if (Bun.env.npm_lifecycle_event === 'test:feat') {
  let testEnv: RulesTestEnvironment
  database = getFirestore(initializeApp())

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({})
  })

  afterEach(async () => {
    await testEnv.clearFirestore()
  })
}

export const $testDatabase = database!

export const $testTaskQueue = {
  enqueue: (data: unknown, params: unknown) => Promise.resolve(),
  delete: (id: unknown) => console.debug('delete task id: ', id),
} as unknown as TaskQueue<TaskRunReset>
