import { Point } from '../../score/validators'
import { Minute, Quantity } from '../../utils/validators'
import type { Product, ProductId } from '../types'
import { ProductId as ProductIdValidator } from '../validators'

export const findAll = () =>
  Promise.resolve(<Product[]>[
    {
      id: ProductIdValidator('5-run-60-minutes'),
      name: '5 runs all time',
      description: 'Unlock 5 runs NOW during 60 minutes.Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(1000),
      period: Minute(60),
      quantity: Quantity(5),
    },
    {
      id: ProductIdValidator('10-run-all-time'),
      name: '10 runs all time',
      description: 'Unlock 10 runs NOW during 60 minutes. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(2000),
      period: Minute(60),
      quantity: Quantity(10),
    },
    {
      id: ProductIdValidator('20-run-all-time'),
      name: '20 runs all time',
      description: 'Unlock 20 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(5000),
      period: 'all-time' as const,
      quantity: Quantity(20),
    },
  ])

export const findById = async (id: ProductId) => {
  const product = (await findAll()).find((product) => product.id === id)
  if (!product) throw new Error(`Product with id ${id} not found`)
  return product
}
