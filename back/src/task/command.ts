import type { Firestore } from '@google-cloud/firestore'
import { ScoreCommand } from '../score/command'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { addMedia as addMediaRepository, findBy, save } from './infra/repository'
import type { Media } from './types'

export namespace TaskCommand {
  export const create = (database: Firestore) => async (userId: UserId) => {
    await save(database)(userId, { join: [] })
  }

  export const join = (database: Firestore) => async (userId: UserId, media: Media) => {
    const { join } = await findBy(database)(userId)
    if (join.includes(media)) throw new Error(`Player has already join ${media}`)
    await addMediaRepository(database)(userId, media)
    await ScoreCommand.addPoints(database)(userId, Point(3000))
  }
}
