import type { Brand } from 'ts-brand'
import type { UserId } from '../user/types'
import type { Minute } from '../utils/types'

export type Run = Brand<number, 'Run'>
export type Runs = { remaining: Run; renewAt: Date; total: Run; period: Minute }
export type TaskRunReset = { userId: UserId }
