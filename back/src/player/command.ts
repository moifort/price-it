import type { Firestore } from '@google-cloud/firestore'
import { AffiliationCommand } from '../affiliation/command'
import { GameCommand } from '../game/command'
import { RunCommand } from '../run/command'
import type { Task__Run } from '../run/module'
import { ScoreCommand } from '../score/command'
import { ShopCommand } from '../shop/command'
import { UserCommand } from '../user/command'
import { UserQuery } from '../user/query'
import type { UserId } from '../user/types'

// TODO: Add tests
export namespace PlayerCommand {
  export const createIfNotExist =
    (database: Firestore, runTaskQueue: Task__Run) => async (id: UserId, firstName: string) => {
      const exists = await UserQuery.isExist(database)(id)
      if (!exists) {
        await UserCommand.create(database)(id, firstName)
        await Promise.all([
          ShopCommand.create(database)(id),
          GameCommand.create(database)(id),
          ScoreCommand.create(database)(id),
          RunCommand.create(database, runTaskQueue)(id),
          AffiliationCommand.create(database)(id),
        ])
      }
      return exists
    }
}
