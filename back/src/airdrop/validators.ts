import { make } from 'ts-brand'
import { z } from 'zod'
import type { WalletId as WalletIdType } from './types'

export const WalletId = (value: unknown) => make<WalletIdType>()(z.string().min(1).parse(value))
