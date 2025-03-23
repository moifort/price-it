<script setup lang="ts">
import Stats from '~/components/molecules/Stats.vue'
import ShopCard from '~/components/organisms/shop/Card.vue'
import Loading from '~/components/organisms/shop/Loading.vue'
import ShopTemplate from '~/components/template/Shop.vue'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'
import { Category, type Period, type ProductId } from '../../../back/src/shop-product/types'
import type { TelegramStar } from '../../../back/src/utils/telegram/types'
import type { Quantity as QuantityTYpe } from '../../../back/src/utils/types'

defineProps<{
  products: { id: ProductId; quantity: QuantityTYpe; period: Period; amount: TelegramStar; category: Category }[]
  score: Score
  runsLeft: Run
  buy: (id: ProductId) => Promise<void>
}>()
</script>

<template>
  <ShopTemplate>
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-medium opacity-60">Bonus</h1>
        <Stats :score="score" :runsLeft="runsLeft" />
      </div>
    </template>


    <template #run>
      <div class="grid grid-cols-2 gap-3" v-if="products.length > 0">
        <ShopCard
          v-for="{ id, quantity, period, amount, category } in products"
          :key="id"
          :id="id"
          :quantity="quantity"
          :period="period"
          :amount="amount"
          :buy="buy"
          :score="score"
          :category="category"
        />
      </div>
      <Loading v-else />
    </template>
  </ShopTemplate>
</template>
