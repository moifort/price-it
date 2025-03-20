import { findAll } from './infra/repository'
import type { ShopProduct } from './types'

export namespace ShopQuery {
  export const getProducts = (): ShopProduct[] => findAll()
}
