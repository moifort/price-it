import { GraphQLError } from 'graphql/error'
import type { Context } from '../module'
import type { TelegramUserId } from '../utils/telegram/types'

export type GraphQlContext = {
  context: Context
  user: { id: TelegramUserId; firstName: string }
}

export class AuthenticationError extends GraphQLError {
  constructor() {
    super('User is not authenticated', {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
    })
  }
}
