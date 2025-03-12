import * as path from 'node:path'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import type { Firestore } from '@google-cloud/firestore'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { isValid, parse } from '@telegram-apps/init-data-node'
import cors from 'cors'
import type { Express } from 'express'
import express from 'express'
import type { TelegramToken } from '../utils/telegram.type'
import { TelegramUserId } from '../utils/telegram.validator'
import { AuthenticationError, type GraphQlContext } from './types'

let instance: Express | null = null
export const graphQlServer = async (database: Firestore, token: TelegramToken) => {
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
        const authorization = req.headers.authorization
        if (!authorization) throw new AuthenticationError()
        const authData = authorization.split(' ')[1]
        if (!authData) throw new AuthenticationError()
        if (!isValid(authData, token, { expiresIn: 3600 })) throw new AuthenticationError()
        const { user } = parse(authData)
        if (!user) throw new AuthenticationError()
        return Promise.resolve({ userId: TelegramUserId(user.id), database })
      },
    }),
  )
  instance = app
  return instance
}
