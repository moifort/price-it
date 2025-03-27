import { logger } from 'firebase-functions'
import { onTaskDispatched } from 'firebase-functions/tasks'
import { getContext } from '../module'
import { GameCommand } from './command'
import type { TaskArgs__Game } from './module'

export const onWinBonusExpired = onTaskDispatched<TaskArgs__Game>(async ({ data }) => {
  try {
    const { $firestore } = getContext()
    await GameCommand.resetWinBonus($firestore)(data.userId)
  } catch (error) {
    logger.error(error)
  }
})
