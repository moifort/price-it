import express, { type Express } from 'express'
import { type Bot, webhookCallback } from 'grammy'

let instance: Express | null = null
export const server = async (bot: Bot) => {
  if (instance) return instance
  instance = express()
  instance.use(express.json())
  instance.use(webhookCallback(bot, 'express'))
  return instance
}
