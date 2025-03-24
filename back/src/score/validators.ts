import { make } from 'ts-brand'
import { z } from 'zod'
import type { Point as PointType, Score as ScoreType } from './types'

export const Score = (value: unknown) =>
  make<ScoreType>()(
    z
      .number()
      .int({ message: `Score must be an integer, received: ${value}` })
      .nonnegative({ message: `Score must be non-negative, received: ${value}` })
      .parse(value),
  )

export const Point = (value: unknown) =>
  make<PointType>()(
    z
      .number()
      .int({ message: `Point must be an integer, received: ${value}` })
      .positive({ message: `Point must be positive, received: ${value}` })
      .parse(value),
  )
