<script setup lang="ts">
import Shop from '~/components/pages/Shop.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { ShopProductId } from '../../back/src/shop/types'

const { data, status, refresh } = useAsyncGql('ShopProducts')
const buy = async (id: ShopProductId) => {
  await GqlShopProduct({ id })
  await refresh()
}
</script>

<template>
  <Shop
      :score="status === 'success' ? data.me.score : Score(0)"
      :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
      :products="status === 'success' ? data.shopProducts :  []"
      :buy="buy" />
</template>

