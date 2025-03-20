<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-white">Special offers</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Product cards -->
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-gray-800 rounded-lg p-6 flex flex-col justify-between hover:bg-gray-700 transition-colors h-64"
      >
        <div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ product.name }}</h2>
          <p class="text-gray-300 mb-4 text-sm">{{ product.description }}</p>

          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-400">{{ product.quantity }} runs</span>
            <span class="text-sm text-gray-400">
              {{ product.period === 'all-time' ? 'Forever' : `${product.period} minutes` }}
            </span>
          </div>
        </div>

        <div class="flex justify-between items-end mt-4">
          <div class="flex items-center">
            <div class="flex relative" :class="getCoinClass(product.amount)">
              <template v-if="getCoinsToDisplay(product.amount) === 3">
                <div></div>
                <div></div>
              </template>
            </div>
            <span class="ml-2 text-white font-bold">{{ formatAmount(product.amount) }}</span>
          </div>

          <Button variant="default" size="default" @click="$emit('buy', product)">Buy</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { chain } from 'lodash'
import { Button } from '~/components/atoms/button'

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['buy'])

// Using functional approach with lodash
const getCoinsToDisplay = (amount) =>
  chain([10000, 50000, 80000])
    .findLastIndex((threshold) => amount > threshold)
    .add(1)
    .value()

const getCoinClass = (amount) => {
  const count = getCoinsToDisplay(amount)
  return {
    'pixel-coin-1': count === 1,
    'pixel-coin-2': count === 2,
    'pixel-coin-3': count === 3,
    'pixel-coin-4': count === 4,
  }
}

const formatAmount = (amount) => new Intl.NumberFormat().format(amount)
</script>
