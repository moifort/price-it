import type { Brand } from 'ts-brand'
import type { TelegramStar } from '../utils/telegram/types'
import type { Minute, Quantity } from '../utils/types'

export type ProductId = Brand<string, 'ProductId'>
export type Category = 'run' | 'time' | 'score'
export type Period = Minute | 'all-time'

export type Product = {
  id: ProductId
  name: string
  description: string
  category: Category
  amount: TelegramStar
  period: Period
  quantity: Quantity
}
