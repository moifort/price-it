import { Point } from '../score/validators'
import { Minute } from '../utils/validators'

export namespace ShopQuery {
  export const getProducts = () => [
    {
      id: '5-run-60-minutes',
      description: 'Unlock 5 runs NOW during 60 minutes.Iincrease your chance to win more points',
      category: 'run' as const,
      amount: Point(10000),
      period: Minute(60),
      quantity: 5,
    },
    {
      id: '5-run-all-time',
      description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
      category: 'run' as const,
      amount: Point(50000),
      period: 'all-time' as const,
      quantity: 5,
    },
  ]
}
