import { make } from 'ts-brand'
import { z } from 'zod'
import type { WalletId } from './types'

export const validateWalletId = (value: unknown) => make<WalletId>()(z.string().min(1).parse(value))
