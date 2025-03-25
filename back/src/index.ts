import { initializeApp } from 'firebase-admin/app'
import { setGlobalOptions } from 'firebase-functions'

initializeApp()
setGlobalOptions({
  region: 'europe-west3',
  memory: '256MiB',
  serviceAccount: 'function-invoker@price-it-85b3e.iam.gserviceaccount.com',
})

export * from './api'
export * as run from './run'
export * as system from './system'
export * from './bot'
