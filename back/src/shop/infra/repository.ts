import { Point } from '../../score/validators'
import { Minute, Quantity } from '../../utils/validators'
import type { ShopProduct, ShopProductId } from '../types'
import { ShopProductId as ShopProductIdValidator } from '../validators'

export const findAllProducts = () =>
  <ShopProduct[]>[
    {
      id: ShopProductIdValidator('5-run-60-minutes'),
      name: '5 runs all time',
      description: 'Unlock 5 runs NOW during 60 minutes.Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(1000),
      period: Minute(60),
      quantity: Quantity(5),
    },
    {
      id: ShopProductIdValidator('10-run-all-time'),
      name: '10 runs all time',
      description: 'Unlock 10 runs NOW during 60 minutes. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(2000),
      period: Minute(60),
      quantity: Quantity(10),
    },
    {
      id: ShopProductIdValidator('20-run-all-time'),
      name: '20 runs all time',
      description: 'Unlock 20 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(5000),
      period: 'all-time' as const,
      quantity: Quantity(20),
    },
  ]

export const findProductById = (id: ShopProductId) => {
  const product = findAllProducts().find((product) => product.id === id)
  if (!product) {
    throw new Error(`Product with id ${id} not found`)
  }
  return product
}
