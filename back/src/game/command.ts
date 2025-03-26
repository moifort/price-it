import type { Firestore } from '@google-cloud/firestore'
import dayjs from 'dayjs'
import { v5 as uuid } from 'uuid'
import type { GuessId } from '../game-guess/types'
import { RunCommand } from '../run/command'
import { ScoreCommand } from '../score/command'
import type { Point as PointType } from '../score/types'
import { Point } from '../score/validators'
import type { Period } from '../shop-product/types'
import type { UserId } from '../user/types'
import { Minute } from '../utils/validators'
import { findBy, save, update } from './infra/repository'
import type { Task__Game } from './module'
import { GameQuery } from './query'

export namespace GameCommand {
  export const create = (database: Firestore) => async (userId: UserId) => {
    await save(database)(userId, {
      winBonus: Point(0),
      winBonusValidPeriod: 'all-time',
      winBonusExpiredAt: new Date(),
    })
  }

  export const applyWinBonus =
    (database: Firestore, taskQueue: Task__Game) =>
    async (userId: UserId, bonus: PointType, validityPeriod: Period) => {
      if (bonus === Point(0) || validityPeriod === Minute(0) || validityPeriod === 'all-time')
        throw new Error('bonus or validityPeriod must be greater than 0 and validityPeriod must not be all-time')

      const { winBonusExpiredAt } = await findBy(database)(userId)
      const taskIdToDelete = uuid(`${userId}-${winBonusExpiredAt}`, uuid.URL)
      await taskQueue.delete(taskIdToDelete)

      const updatedExpiredAt = dayjs().add(validityPeriod, 'minutes').toDate()
      await update(database)(userId, {
        winBonus: bonus,
        winBonusValidPeriod: validityPeriod,
        winBonusExpiredAt: updatedExpiredAt,
      })
      const taskId = uuid(`${userId}-${updatedExpiredAt}`, uuid.URL)
      await taskQueue.enqueue({ userId }, { scheduleTime: updatedExpiredAt, id: taskId })
    }

  export const resetWinBonus = (database: Firestore) => async (userId: UserId) => {
    await update(database)(userId, {
      winBonus: Point(0),
      winBonusValidPeriod: 'all-time',
      winBonusExpiredAt: new Date(),
    })
  }

  export const win = (database: Firestore) => async (userId: UserId, guessId: GuessId) => {
    const { winBonus } = await findBy(database)(userId)
    const totalWinPoints = Point(winBonus + GameQuery.DEFAULT_WIN_POINTS)
    await Promise.all([
      update(database)(userId, { position: guessId }),
      ScoreCommand.addPoints(database)(userId, totalWinPoints),
      RunCommand.decrease(database)(userId),
    ])
  }

  export const lose = (database: Firestore) => (userId: UserId, guessId: GuessId) =>
    Promise.all([update(database)(userId, { position: guessId }), RunCommand.decrease(database)(userId)])
}
