import { afterEach, beforeAll } from 'bun:test'
import { type RulesTestEnvironment, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import type { Firestore } from '@google-cloud/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { Task__Run } from '../run/module'

let firestore: Firestore | undefined
if (Bun.env.npm_lifecycle_event === 'test:feat') {
  let testEnv: RulesTestEnvironment
  firestore = getFirestore(initializeApp())

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({})
  })

  afterEach(async () => {
    await testEnv.clearFirestore()
  })
}

export const $testFirestore = firestore!

export const $testTaskQueue = {
  enqueue: (data: unknown, params: unknown) => Promise.resolve(),
  delete: (id: unknown) => console.debug('delete task id: ', id),
} as unknown as Task__Run
