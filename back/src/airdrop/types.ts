import type { Brand } from 'ts-brand'

export type WalletId = Brand<string, 'WalletId'>
export type Airdrop = { walletId: WalletId }
