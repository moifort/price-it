import * as path from 'node:path'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import type { Firestore } from '@google-cloud/firestore'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { isValid, parse } from '@telegram-apps/init-data-node'
import cors from 'cors'
import type { Express } from 'express'
import express from 'express'
import type { TaskQueue } from 'firebase-admin/functions'
import type { TaskRunReset } from '../run/types'
import type { TelegramToken } from '../utils/telegram/types'
import { TelegramUserId } from '../utils/telegram/validators'
import { errorLoggingPlugin } from './plugins/logger'
import { AuthenticationError, type GraphQlContext } from './types'

let instance: Express | null = null
export const graphQlServer = async (
  { token, isDev }: { token: TelegramToken; isDev: boolean },
  { database, runTaskQueue }: { database: Firestore; runTaskQueue: TaskQueue<TaskRunReset> },
) => {
  if (instance) return instance
  const typeDefFiles = loadFilesSync(path.join(__dirname, '../**/graphql/typedefs.*'))
  const resolverFiles = loadFilesSync(path.join(__dirname, '../**/graphql/resolvers.*'))
  const server = new ApolloServer<GraphQlContext>({
    introspection: true,
    typeDefs: mergeTypeDefs(typeDefFiles),
    resolvers: mergeResolvers<unknown, GraphQlContext>(resolverFiles),
    plugins: [
      // TODO: rajouter sentry bug tracking + perf
      errorLoggingPlugin(),
      isDev
        ? ApolloServerPluginLandingPageLocalDefault({
            embed: {
              initialState: {
                sharedHeaders: {
                  Authorization:
                    'tma user=%7B%22id%22%3A8153383236%2C%22first_name%22%3A%22Pierre%22%2C%22last_name%22%3A%22Loti%22%2C%22language_code%22%3A%22fr%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FSHnWzLJveat4AM0T-17-wwaZ-wpQbu_HkNfQss9EMpGAiFFCoen8pqsu29nYGZee.svg%22%7D&chat_instance=-5489035838474910652&chat_type=private&auth_date=1741767805&signature=1SpWE-EO0_sVje1gzjyGzHhwxQtJSt1Vochbc5I4WsrEuVTB67eR4pCZAN5_7AuqGh3UoYNnhY_qO3BGWViADg&hash=0dae4daf23fa609486c485727fec898d66daa0e6cb1652dd80add09a3a50868f',
                },
              },
            },
          })
        : ApolloServerPluginLandingPageProductionDefault(),
    ],
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
        // TODO: rajouter expiration du token
        if (!isDev && !isValid(authData, token)) throw new AuthenticationError()
        const { user } = parse(authData)
        if (!user) throw new AuthenticationError()
        return Promise.resolve({
          database,
          runTaskQueue,
          userId: TelegramUserId(user.id),
          user: { id: TelegramUserId(user.id), firstName: user.first_name },
        })
      },
    }),
  )
  instance = app
  return instance
}
