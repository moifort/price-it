import { make } from 'ts-brand'
import { z } from 'zod'
import type { Point as PointType, Score as ScoreType } from './types'

export const Score = (value: unknown) =>
  make<ScoreType>()(
    z
      .number({ message: `Score must be a number, received: ${value}` })
      .int({ message: `Score must be an integer, received: ${value}` })
      .nonnegative({ message: `Score must be non-negative, received: ${value}` })
      .parse(value),
  )

export const Point = (value: unknown) =>
  make<PointType>()(
    z
      .number({ message: `Point must be a number, received: ${value}` })
      .int({ message: `Point must be an integer, received: ${value}` })
      .min(0, { message: `Minute must be non-negative, received: ${value}` })
      .parse(value),
  )
