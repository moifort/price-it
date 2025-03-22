import { make } from 'ts-brand'
import { z } from 'zod'
import type { GuessId as GuessIdType } from './types'

export const GuessId = (value: unknown) => make<GuessIdType>()(z.string().uuid().parse(value))
