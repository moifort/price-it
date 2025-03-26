import type { Airdrop } from '../airdrop/types'
import type { Game } from '../game/types'
import type { Runs } from '../run/types'
import type { Score } from '../score/types'
import type { Shop } from '../shop/types'
import type { User } from '../user/types'

export type Player = User & { score: Score; runs: Runs; airdrop: Airdrop; game: Game; shop: Shop }
