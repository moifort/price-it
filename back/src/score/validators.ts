import { make } from 'ts-brand'
import { z } from 'zod'
import type { Score as ScoreType } from './types'

export const Score = (value: unknown) => make<ScoreType>()(z.number().int().nonnegative().parse(value))
