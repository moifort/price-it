<script setup lang="ts">
import Shop from '~/components/pages/Shop.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { ProductId } from '../../back/src/shop-product/types'

const { open: openInvoice } = useInvoice()
const { data, status } = useAsyncGql('ShopQuery')
const buy = async (id?: ProductId) => {
  try {
    // const { buyProduct } = await GqlShopBuyProduct({ id })
    const paymentResult = await openInvoice(
      `https://t.me/invoice/test-paiement?amount=66&title=Product Purchase&payload=${encodeURIComponent(JSON.stringify({ userId: 'userId', productId: id }))}`,
    )
    if (paymentResult === 'paid') {
    } else if (paymentResult === 'failed' || paymentResult === 'cancelled') {
    }
  } catch (error) {}
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

