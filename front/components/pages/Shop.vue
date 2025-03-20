<script setup lang="ts">
import ShopCard from '~/components/organisms/shop/Card.vue'
import MainTemplate from '~/components/template/Main.vue'
import type { Point } from '../../../back/src/score/types'
import { type Period, type ShopProductId } from '../../../back/src/shop/types'
import type { Quantity } from '../../../back/src/utils/types'

defineProps<{ products: { id: ShopProductId; quantity: Quantity; period: Period; amount: Point }[] }>()
</script>

<template>
  <MainTemplate>
    <template #title>
      <h1 class="text-3xl font-medium opacity-60">Run Bonus</h1>
    </template>

    <template #body>
      <div class="grid grid-cols-2 gap-3">
        <ShopCard
          v-for="{ id, quantity, period, amount } in products"
          :key="id"
          :id="id"
          :quantity="quantity"
          :period="period"
          :amount="amount"
        />
      </div>
    </template>
  </MainTemplate>
</template>
