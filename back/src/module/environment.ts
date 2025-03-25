import { TelegramToken } from '../utils/telegram/validators'
import { Environment as EnvironmentValidator, Url } from '../utils/validators'

export const initialize = (env: Record<string, string | undefined>) => ({
  ...env,
  ENVIRONMENT: EnvironmentValidator(env.ENVIRONMENT),
  TELEGRAM_TOKEN: TelegramToken(env.TELEGRAM_TOKEN),
  TELEGRAM_WEBHOOK_URL: Url(env.TELEGRAM_WEBHOOK_URL),
  FUNCTIONS_EMULATOR: env.FUNCTIONS_EMULATOR === 'true',
})

export type Environment = Record<string, string | undefined> & ReturnType<typeof initialize>
