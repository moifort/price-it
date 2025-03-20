import type { Brand } from 'ts-brand'
import type { Point } from '../score/types'
import type { Minute } from '../utils/types'

export type ProductId = Brand<string, 'ShopProductId'>
export type Quantity = Brand<number, 'Quantity'>
export type Category = 'run' | 'time' | 'score'
export type Period = Minute | 'all-time'

export type Product = {
  id: ProductId
  name: string
  description: string
  category: Category
  amount: Point
  period: Period
  quantity: Quantity
}
