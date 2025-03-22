<script setup lang="ts">
import Shop from '~/components/pages/Shop.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { ShopProductId } from '../../back/src/shop/types'

// TODO: implement payment https://core.telegram.org/bots/payments-stars et back npm node-telegram-bot-api
const { open: openInvoice } = useInvoice()
// const { data, status, refresh } = useAsyncGql('ShopProducts')
const message = ref('')
const buy = async (id?: ShopProductId) => {
  try {
    // const { buyProduct } = await GqlShopBuyProduct({ id })
    const paymentResult = await openInvoice(
      `https://t.me/invoice/test-paiement?amount=66&title=Product Purchase&payload=${encodeURIComponent(JSON.stringify({ userId: 'userId', productId: id }))}`,
    )
    if (paymentResult === 'paid') {
      message.value = 'Payment successful'
    } else if (paymentResult === 'failed' || paymentResult === 'cancelled') {
      message.value = `Payment unsuccessful ${paymentResult}`
    }
  } catch (error) {
    message.value = `'Error during purchase`
  }
}
</script>

<template>
  <Button @click="buy()">Refresh</Button>
  {{ message }}
<!--  <Shop-->
<!--      :score="status === 'success' ? data.me.score : Score(0)"-->
<!--      :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"-->
<!--      :products="status === 'success' ? data.shopProducts :  []"-->
<!--      :buy="buy"-->
<!--  />-->
</template>

