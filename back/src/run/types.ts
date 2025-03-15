import type { Brand } from 'ts-brand'
import type { Minute } from '../utils/types'

export type Run = Brand<number, 'Run'>
export type Runs = {
  remaining: Run
  total: Run
  renewIn: Minute
}
