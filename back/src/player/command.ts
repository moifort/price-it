import type { TaskQueue } from 'firebase-admin/functions'
import type { Database } from '../api/types'
import { RunCommand } from '../run/command'
import { RunQuery } from '../run/query'
import type { TaskRunReset } from '../run/types'
import { ScoreCommand } from '../score/command'
import { ScoreQuery } from '../score/query'
import { UserCommand } from '../user/command'
import { UserQuery } from '../user/query'
import type { UserId } from '../user/types'

export namespace PlayerCommand {
  export const createIfNotExist =
    (database: Database, runTaskQueue: TaskQueue<TaskRunReset>) => async (id: UserId, firstName: string) => {
      const exists = await UserQuery.isExist(database)(id)
      if (!exists) {
        await UserCommand.create(database)(id, firstName)
        await Promise.all([
          ScoreCommand.create(database)(id, ScoreQuery.DEFAULT_SCORE),
          RunCommand.create(database, runTaskQueue)(
            id,
            RunQuery.DEFAULT_RUN,
            RunQuery.DEFAULT_RUN,
            RunQuery.DEFAULT_PERIOD,
          ),
        ])
      }
      return id
    }
}
