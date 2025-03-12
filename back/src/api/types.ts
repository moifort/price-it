import type { Firestore } from '@google-cloud/firestore'
import { GraphQLError } from 'graphql/error'

export type GraphQlContext = {
  database: Firestore
  userId: string
}

export class AuthenticationError extends GraphQLError {
  constructor() {
    super('User is not authenticated', {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
    })
  }
}
