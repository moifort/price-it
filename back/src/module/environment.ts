import { TelegramToken } from '../utils/telegram/validators'
import { Environment, Url } from '../utils/validators'

export const initialize = (env: Record<string, string | undefined>) => ({
  ...env,
  ENVIRONMENT: Environment(env.ENVIRONMENT),
  TELEGRAM_TOKEN: TelegramToken(env.TELEGRAM_TOKEN),
  TELEGRAM_WEBHOOK_URL: Url(env.TELEGRAM_WEBHOOK_URL),
  FUNCTIONS_EMULATOR: env.FUNCTIONS_EMULATOR === 'true',
})
