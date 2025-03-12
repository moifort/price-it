import type { Firestore } from '@google-cloud/firestore'
import { GraphQLError } from 'graphql/error'
import type { TelegramUserId } from '../utils/telegram/types'

export type Database = Firestore
export type GraphQlContext = {
  database: Database
  userId: TelegramUserId
  user: { id: TelegramUserId; firstName: string }
}

export class AuthenticationError extends GraphQLError {
  constructor() {
    super('User is not authenticated', {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
    })
  }
}
