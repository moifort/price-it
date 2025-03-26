import { initializeApp } from 'firebase-admin/app'
import { setGlobalOptions } from 'firebase-functions'

initializeApp()
setGlobalOptions({
  region: 'europe-west3',
  memory: '256MiB',
  serviceAccount: 'function-invoker@price-it-85b3e.iam.gserviceaccount.com',
})

export * from './api'
export * from './bot'
export * as shop from './shop'
export * as run from './run'
export * as game from './game'
export * as system from './system'
