import { onRequest } from 'firebase-functions/https'
import { getContext } from '../module'
import { graphQlServer } from './server'

export const api = onRequest(async (req, res) => {
  const app = await graphQlServer(getContext())
  return app(req, res)
})
