import type { ProductId } from '../shop-product/types'

export type Shop = {
  purchased: { updatedAt: Date } & Record<ProductId, number>
}
