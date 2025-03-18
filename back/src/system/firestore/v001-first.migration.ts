import { logger } from 'firebase-functions'
import type { Migrate } from './migration'

export const migrate: Migrate = () => {
  logger.log('Migrating v001-first')
}
