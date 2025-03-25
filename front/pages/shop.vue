<script setup lang="ts">
import Shop from '~/components/pages/Shop.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { ProductId } from '../../back/src/shop-product/types'

const { open: openInvoice } = useInvoice()
const { data, status } = useAsyncGql('ShopQuery')
const buy = async (productId: ProductId) => {
  const { shop } = await GqlShopCreateInvoice({ productId })
  await openInvoice(shop.createInvoice)
}
</script>

<template>
  <Shop
      :score="status === 'success' ? data.me.score : Score(0)"
      :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
      :products="status === 'success' ? data.shop.products :  []"
      :buy="buy"
  />
</template>

