import * as path from 'node:path'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import cors from 'cors'
import type { Express } from 'express'
import express from 'express'
import { GraphQLError } from 'graphql/error'
import type { GraphQlContext } from './types'

let instance: Express | null = null
export const graphQlServer = async () => {
  if (instance) return instance
  const typeDefFiles = loadFilesSync(path.join(__dirname, '../**/graphql/typedefs.*'))
  const resolverFiles = loadFilesSync(path.join(__dirname, '../**/graphql/resolvers.*'))
  const server = new ApolloServer<GraphQlContext>({
    introspection: true,
    typeDefs: mergeTypeDefs(typeDefFiles),
    resolvers: mergeResolvers<unknown, GraphQlContext>(resolverFiles),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })
  const app = express()
  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req }) => {
        if (!req.headers.authorization) {
          throw new GraphQLError('User is not authenticated', {
            extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
          })
        }
        return Promise.resolve({ userId: '123' })
      },
    }),
  )
  instance = app
  return instance
}
