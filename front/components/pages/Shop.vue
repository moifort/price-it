<script setup lang="ts">
import Stats from '~/components/molecules/Stats.vue'
import ShopCard from '~/components/organisms/shop/Card.vue'
import Loading from '~/components/organisms/shop/Loading.vue'
import ShopTemplate from '~/components/template/Shop.vue'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'
import type { Category, Period, ProductId } from '../../../back/src/shop-product/types'
import type { TelegramStar } from '../../../back/src/utils/telegram/types'
import type { Quantity as QuantityTYpe } from '../../../back/src/utils/types'

defineProps<{
  products: { id: ProductId; quantity: QuantityTYpe; period: Period; amount: TelegramStar; category: Category }[]
  score: Score
  runsLeft: Run
  hasWinBonus: boolean
  buy: (id: ProductId) => Promise<void>
}>()
</script>

<template>
  <ShopTemplate>
    <template #title>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-medium opacity-60">Runs</h1>
        <Stats :score="score" :runsLeft="runsLeft" />
      </div>
    </template>


    <template #run>
      <div class="grid grid-cols-2 gap-3" v-if="products.length > 0">
        <ShopCard
          :key="products[0].id"
          :id="products[0].id"
          :quantity="products[0].quantity"
          :period="products[0].period"
          :amount="products[0].amount"
          :buy="buy"
          :score="score"
          :category="products[0].category"
          :disabled="products[0].category === 'score' && hasWinBonus"
        />
        <ShopCard
            :key="products[1].id"
            :id="products[1].id"
            :quantity="products[1].quantity"
            :period="products[1].period"
            :amount="products[1].amount"
            :buy="buy"
            :score="score"
            :category="products[1].category"
            :disabled="products[1].category === 'score' && hasWinBonus"
        />
      </div>
      <Loading v-else />
    </template>

    <template #win>
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-medium opacity-60">Win</h1>
      </div>
      <div class="grid grid-cols-2 gap-3" v-if="products.length > 0">
        <ShopCard
            :key="products[2].id"
            :id="products[2].id"
            :quantity="products[2].quantity"
            :period="products[2].period"
            :amount="products[2].amount"
            :buy="buy"
            :score="score"
            :category="products[2].category"
            :disabled="products[2].category === 'score' && hasWinBonus"
        />
        <ShopCard
            :key="products[3].id"
            :id="products[3].id"
            :quantity="products[3].quantity"
            :period="products[3].period"
            :amount="products[3].amount"
            :buy="buy"
            :score="score"
            :category="products[3].category"
            :disabled="products[3].category === 'score' && hasWinBonus"
        />
        <ShopCard
            :key="products[4].id"
            :id="products[4].id"
            :quantity="products[4].quantity"
            :period="products[4].period"
            :amount="products[4].amount"
            :buy="buy"
            :score="score"
            :category="products[4].category"
            :disabled="products[4].category === 'score' && hasWinBonus"
        />
        <ShopCard
            :key="products[5].id"
            :id="products[5].id"
            :quantity="products[5].quantity"
            :period="products[5].period"
            :amount="products[5].amount"
            :buy="buy"
            :score="score"
            :category="products[5].category"
            :disabled="products[5].category === 'score' && hasWinBonus"
        />
      </div>
      <Loading v-else />
    </template>
  </ShopTemplate>
</template>
