import type { Brand } from 'ts-brand'
import type { Amount, Url } from '../utils/types'

export type ProductId = Brand<string, 'ProductId'>
export type ProductCategory = Brand<string, 'ProductCategory'>
export type Product = {
  id: ProductId
  name: string
  image: Url
  price: Amount
  category: string
  url: Url
}
