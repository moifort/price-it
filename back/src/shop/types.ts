import type { Brand } from 'ts-brand'
import type { Point } from '../score/types'
import type { Minute, Quantity } from '../utils/types'

export type ShopProductId = Brand<string, 'ShopProductId'>
export type Category = 'run' | 'time' | 'score'
export type Period = Minute | 'all-time'

export type ShopProduct = {
  id: ShopProductId
  name: string
  description: string
  category: Category
  amount: Point
  period: Period
  quantity: Quantity
}
