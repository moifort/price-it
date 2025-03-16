import type { ApolloServerPlugin } from '@apollo/server'
import { logger } from 'firebase-functions'
import type { GraphQlContext } from '../types'

export const errorLoggingPlugin = (): ApolloServerPlugin<GraphQlContext> => ({
  requestDidStart: () => {
    return Promise.resolve({
      didEncounterErrors: ({ errors, request, contextValue }) => {
        // biome-ignore lint/complexity/noForEach: only for console.log
        errors.forEach((error) => {
          logger.error('GraphQL Error', {
            error: error.message,
            stack: error.originalError ? error.originalError.stack : null,
            operation: request.operationName,
            variables: request.variables,
            query: request.query,
            userId: contextValue.user ? contextValue.userId : 'no-authenticated',
          })
        })
        return Promise.resolve()
      },
    })
  },
})
