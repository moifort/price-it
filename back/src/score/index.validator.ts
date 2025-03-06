import { make } from 'ts-brand'
import { z } from 'zod'
import type { Score as ScoreType } from './index.type'

export const Score = make<ScoreType>((value) => z.number().int().nonnegative().parse(value))
