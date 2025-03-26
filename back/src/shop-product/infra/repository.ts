import { GameQuery } from '../../game/query'
import { TelegramStar } from '../../utils/telegram/validators'
import { Minute, Quantity } from '../../utils/validators'
import type { Product, ProductId } from '../types'
import { ProductId as ProductIdValidator } from '../validators'

export const findAll = () =>
  Promise.resolve(<Product[]>[
    {
      id: ProductIdValidator('20-run-all-time'),
      name: '20 runs all time',
      description: 'Unlock 20 runs NOW for all time.Increase your chance to win more points',
      category: 'run' as const,
      amount: TelegramStar(1),
      period: 'all-time',
      quantity: Quantity(20),
    },
    {
      id: ProductIdValidator('50-run-all-time'),
      name: '50 runs all time',
      description: 'Unlock 50 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: TelegramStar(1),
      period: 'all-time',
      quantity: Quantity(50),
    },
    {
      id: ProductIdValidator('x2-win-1-day'),
      name: 'x2 for 1 day',
      description: 'Double your points for 1 day. Increase your chance to win more points',
      category: 'score' as const,
      amount: TelegramStar(1),
      period: Minute(24 * 60),
      quantity: Quantity(GameQuery.DEFAULT_WIN_POINTS),
    },
    {
      id: ProductIdValidator('x2-win-3-days'),
      name: 'x2 for 3 days',
      description: 'Double your points for 3 days. Increase your chance to win more points',
      category: 'score' as const,
      amount: TelegramStar(1),
      period: Minute(3 * 24 * 60),
      quantity: Quantity(GameQuery.DEFAULT_WIN_POINTS),
    },
    {
      id: ProductIdValidator('x3-win-1-day'),
      name: 'x3 for 1 day',
      description: 'Triple your points for 1 day. Increase your chance to win more points',
      category: 'score' as const,
      amount: TelegramStar(1),
      period: Minute(24 * 60),
      quantity: Quantity(2 * GameQuery.DEFAULT_WIN_POINTS),
    },
    {
      id: ProductIdValidator('x3-win-3-days'),
      name: 'x3 for 3 days',
      description: 'Triple your points for 3 days. Increase your chance to win more points',
      category: 'score' as const,
      amount: TelegramStar(1),
      period: Minute(3 * 24 * 60),
      quantity: Quantity(2 * GameQuery.DEFAULT_WIN_POINTS),
    },
  ])

export const findById = async (id: ProductId) => {
  const product = (await findAll()).find((product) => product.id === id)
  if (!product) throw new Error(`Product with id ${id} not found`)
  return product
}
