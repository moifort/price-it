import { make } from 'ts-brand'
import { z } from 'zod'
import type { Score as ScoreType, Point as PointType } from './types'

export const Score = (value: unknown) => make<ScoreType>()(z.number().int().nonnegative().parse(value))
export const Point = (value: unknown) => make<PointType>()(z.number().int().positive().parse(value))
