import type { ProductId } from '../shop-product/types'

export type Shop = {
  purchased: Record<ProductId, number>
}
