import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { setGlobalOptions } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'
import { graphQlServer } from './api'
import { TelegramToken } from './utils/telegram.validator'

const app = initializeApp()
const firestore = getFirestore(app)

setGlobalOptions({
  region: 'europe-west3',
  memory: '256MiB',
  serviceAccount: 'function-invoker@price-it-85b3e.iam.gserviceaccount.com',
})

export const api = onRequest(async (req, res) => {
  const app = await graphQlServer(firestore, TelegramToken(process.env.TELEGRAM_TOKEN!))
  return app(req, res)
})
