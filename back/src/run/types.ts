import type { Brand } from 'ts-brand'
import type { UserId } from '../user/types'

export type Run = Brand<number, 'Run'>
export type Runs = { remaining: Run; renewAt: Date; total: Run }

export type TaskRunReset = { userId: UserId }
