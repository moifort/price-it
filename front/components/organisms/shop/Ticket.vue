<script setup lang="ts">
import { Check, LoaderCircle, Trophy } from 'lucide-vue-next'
import { Card } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { ProductId } from '../../../../back/src/shop-product/types'
import type { Quantity } from '../../../../back/src/utils/types'

const props = defineProps<{
  id: ProductId
  quantity: Quantity
  buy: (id: ProductId) => Promise<void>
}>()

const success = ref(false)
const loading = ref(false)
const buy = async (id: ProductId) => {
  loading.value = true
  try {
    await props.buy(id)
    success.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    success.value = false
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="bg-yellow-500 p-3 px-3" @click="buy(id)">
    <div class="flex items-center">
      <div class="mr-2">
        <Avatar class="bg-blackA3 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle border border-black">
          <template v-if="success" class="w-16"> <Check class="text-black"/> </template>
          <template v-else-if="loading"  class="w-16"> <LoaderCircle class="animate-spin duration-500 text-black"/> </template>
          <Trophy v-else class="h-6 w-6 text-black"/>
        </Avatar>
      </div>
      <div class="flex flex-col text-black justify-start">
        <div class="text-2xl font-bold">
          {{ formatNumber(quantity) }}
        </div>
        <div class="text-md font-medium -mt-2 opacity-70">Points</div>
      </div>


    </div>
  </Card>
</template>
