import { getFirestore } from 'firebase-admin/firestore'
import { onRequest } from 'firebase-functions/https'
import { $app } from '../index'
import { TelegramToken } from '../utils/telegram/validators'
import { graphQlServer } from './server'

export const api = onRequest(async (req, res) => {
  const app = await graphQlServer(
    { token: TelegramToken(process.env.TELEGRAM_TOKEN), isDev: process.env.ENVIRONMENT === 'development' },
    { database: getFirestore($app) },
  )
  return app(req, res)
})
