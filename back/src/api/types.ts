import type { Firestore } from '@google-cloud/firestore'
import { GraphQLError } from 'graphql/error'
import type { TelegramUserId } from '../utils/telegram/types'

export type GraphQlContext = {
  database: Firestore
  userId: TelegramUserId
  user: {
    firstName: string
    lastName?: string | undefined
  }
}

export class AuthenticationError extends GraphQLError {
  constructor() {
    super('User is not authenticated', {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
    })
  }
}
