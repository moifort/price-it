import { make } from 'ts-brand'
import { z } from 'zod'
import type { Run as RunType } from './types'

export const Run = (value: unknown) => make<RunType>()(z.number().int().nonnegative().parse(value))
