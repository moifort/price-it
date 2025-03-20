import { Point } from '../score/validators'
import { Minute } from '../utils/validators'
import { ShopProductId } from './validators'

import type { ShopProduct } from './types'

export namespace ShopQuery {
  export const getProducts = () =>
    <ShopProduct[]>[
      {
        id: ShopProductId('5-run-60-minutes'),
        name: '5 runs 60 minutes',
        description: 'Unlock 5 runs NOW during 60 minutes.Increase your chance to win more points',
        category: 'run' as const,
        amount: Point(10000),
        period: Minute(60),
        quantity: 5,
      },
      {
        id: ShopProductId('5-run-all-time'),
        name: '5 runs all time',
        description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
        category: 'run' as const,
        amount: Point(50000),
        period: 'all-time' as const,
        quantity: 5,
      },
      {
        id: ShopProductId('10-run-60-minutes'),
        name: '10 runs 60 minutes',
        description: 'Unlock 5 runs NOW during 60 minutes.Increase your chance to win more points',
        category: 'run' as const,
        amount: Point(17000),
        period: Minute(60),
        quantity: 10,
      },
      {
        id: ShopProductId('10-run-all-time'),
        name: '10 runs all time',
        description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
        category: 'run' as const,
        amount: Point(70000),
        period: 'all-time' as const,
        quantity: 10,
      },
      {
        id: ShopProductId('20-run-all-time'),
        name: '20 runs all time',
        description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
        category: 'run' as const,
        amount: Point(100000),
        period: 'all-time' as const,
        quantity: 10,
      },
    ]
}
