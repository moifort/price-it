<script setup lang="ts">
import Stats from '~/components/molecules/Stats.vue'
import ShopCard from '~/components/organisms/shop/Card.vue'
import Loading from '~/components/organisms/shop/Loading.vue'
import MainTemplate from '~/components/template/Main.vue'
import type { Run } from '../../../back/src/run/types'
import type { Point, Score } from '../../../back/src/score/types'
import { type Period, type ShopProductId } from '../../../back/src/shop/types'
import type { Quantity } from '../../../back/src/utils/types'

defineProps<{
  products: { id: ShopProductId; quantity: Quantity; period: Period; amount: Point }[]
  score: Score
  runsLeft: Run
  buy: (id: ShopProductId) => Promise<void>
}>()
</script>

<template>
  <MainTemplate>
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-medium opacity-60">Run Bonus</h1>
        <Stats :score="score" :runsLeft="runsLeft" />
      </div>
    </template>

    <template #body>
      <div class="grid grid-cols-2 gap-3" v-if="products.length > 0">
        <ShopCard
          v-for="{ id, quantity, period, amount } in products"
          :key="id"
          :id="id"
          :quantity="quantity"
          :period="period"
          :amount="amount"
          :buy="buy"
          :score="score"
        />
      </div>
      <Loading v-else />
    </template>
  </MainTemplate>
</template>
