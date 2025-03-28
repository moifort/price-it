import type { Firestore } from '@google-cloud/firestore'
import { ScoreCommand } from '../score/command'
import { Point } from '../score/validators'
import type { UserId } from '../user/types'
import { addFriend as addFriendRepository, save } from './infra/repository'

export namespace AffiliationCommand {
  export const create = ($firestore: Firestore) => async (userId: UserId) => {
    await save($firestore)(userId, { friends: [] })
  }

  // TODO Ajouter les points seulement si l'ami est ajouté a la base de donnée
  export const addFriend = ($firestore: Firestore) => async (userId: UserId, friendId: UserId) => {
    await addFriendRepository($firestore)(userId, friendId)
    await ScoreCommand.addPoints($firestore)(userId, Point(5000))
  }
}
