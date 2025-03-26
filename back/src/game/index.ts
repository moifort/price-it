import { onTaskDispatched } from 'firebase-functions/tasks'
import { getContext } from '../module'
import { GameCommand } from './command'
import type { TaskArgs__Game } from './module'

export const onWinBonusExpired = onTaskDispatched<TaskArgs__Game>(async ({ data }) => {
  const { $firestore } = getContext()
  await GameCommand.resetWinBonus($firestore)(data.userId)
})
