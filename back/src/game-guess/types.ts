import type { Brand } from 'ts-brand'
import type { Amount, Url } from '../utils/types'

export type GuessId = Brand<string, 'GuessId'>
export type Product = {
  id: GuessId
  name: string
  description: string
  image: Url
  price: Amount
  category: string
  url: Url
}
