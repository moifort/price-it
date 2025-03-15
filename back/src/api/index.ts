import { getFirestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { onRequest } from 'firebase-functions/https'
import { $app } from '../index'
import type { TaskRunReset } from '../run/types'
import { TelegramToken } from '../utils/telegram/validators'
import { graphQlServer } from './server'

export const api = onRequest(async (req, res) => {
  const database = getFirestore($app)
  const runTaskQueue = getFunctions($app).taskQueue<TaskRunReset>('run-reset')
  const app = await graphQlServer(
    { token: TelegramToken(process.env.TELEGRAM_TOKEN), isDev: process.env.ENVIRONMENT === 'development' },
    { database, runTaskQueue },
  )
  return app(req, res)
})
