<script setup lang="ts">
import MainTemplate from '~/components/template/Main.vue'
import ShopCard from '~/components/organisms/shop/Card.vue'
import { ShopProduct } from '../../../back/src/shop/types'

defineProps<{ products: ShopProduct }>()
</script>

<template>
  <MainTemplate>
    <template #title>
      <h1 class="text-3xl font-medium opacity-60">Run Bonus</h1>
    </template>

    <template #body>
      <div class="grid grid-cols-2 gap-2">
        <ShopCard 
          v-for="product in products" 
          :key="product.id"
          :id="product.id"
          :quantity="product.quantity"
          :period="product.period"
          :amount="product.amount"
          @buy="$emit('buy', $event)"
        />
      </div>
    </template>
  </MainTemplate>
</template>
