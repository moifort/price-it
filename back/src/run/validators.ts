import { make } from 'ts-brand'
import { z } from 'zod'
import type { Run as RunType } from './types'

export const Run = (value: unknown) => make<RunType>()(
  z.number()
    .int({ message: `Run must be an integer, received: ${value}` })
    .nonnegative({ message: `Run must be non-negative, received: ${value}` })
    .parse(value)
)
