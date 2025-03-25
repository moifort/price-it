import { initialize as initializeTelegramBot } from '../bot/module'
import { initialize as initializeEnvironment } from './environment'
import { initialize as initializeFirebase } from './firebase'

export type Context = ReturnType<typeof initializeContext>

let context: Context | null = null
const initializeContext = () => {
  const $environment = initializeEnvironment(process.env)
  const isDev = $environment.ENVIRONMENT === 'development'
  const isProd = $environment.ENVIRONMENT === 'production'
  const $firebase = initializeFirebase($environment.FUNCTIONS_EMULATOR)
  const $telegramBot = initializeTelegramBot($environment.TELEGRAM_TOKEN, $environment.TELEGRAM_WEBHOOK_URL, isProd)
  const instances = { $environment, ...$firebase, $telegramBot, isDev, isProd }
  context = instances
  return instances
}

export const getContext = () => {
  if (context) return context
  context = initializeContext()
  return context
}
