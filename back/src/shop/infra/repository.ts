import { Point } from '../../score/validators'
import { Minute } from '../../utils/validators'
import type { ShopProduct, ShopProductId } from '../types'
import { ShopProductId as ShopProductIdValidator } from '../validators'

export const findAllProducts = () =>
  <ShopProduct[]>[
    {
      id: ShopProductIdValidator('10-run-60-minutes'),
      name: '10 runs 60 minutes',
      description: 'Unlock 5 runs NOW during 60 minutes.Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(17000),
      period: Minute(60),
      quantity: 10,
    },
    {
      id: ShopProductIdValidator('10-run-all-time'),
      name: '10 runs all time',
      description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(70000),
      period: 'all-time' as const,
      quantity: 10,
    },
    {
      id: ShopProductIdValidator('20-run-all-time'),
      name: '20 runs all time',
      description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(100000),
      period: 'all-time' as const,
      quantity: 10,
    },
  ]

export const findProductById = (id: ShopProductId) => {
  const product = findAllProducts().find((product) => product.id === id)
  if (!product) {
    throw new Error(`Product with id ${id} not found`)
  }
  return product
}
