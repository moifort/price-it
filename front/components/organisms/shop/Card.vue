<script setup lang="ts">
import dayjs from 'dayjs'
import { Check, LoaderCircle, ShoppingBag, Timer, X } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { Button } from '~/components/atoms/button'
import { Card, CardContent, CardFooter } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Score } from '../../../../back/src/score/types'
import type { Category, Period, ProductId } from '../../../../back/src/shop-product/types'
import type { TelegramStar } from '../../../../back/src/utils/telegram/types'
import type { Quantity } from '../../../../back/src/utils/types'

const props = defineProps<{
  id: ProductId
  quantity: Quantity
  period: Period
  amount: TelegramStar
  score: Score
  category: Category
  buy: (id: ProductId) => Promise<void>
}>()

const success = ref(false)
const loading = ref(false)
const error = ref(false)
const buyProduct = async (id: ProductId) => {
  loading.value = true
  try {
    await props.buy(id)
    success.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    success.value = false
  } catch (e) {
    error.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    error.value = false
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="relative">
    <div class="absolute top-0 right-0 z-10">
      <Badge variant="default" class="py-1 px-2 flex rounded-br-none rounded-tl-none"
             :class="period === 'all-time' ? 'bg-purple-500' : 'bg-blue-500'">
        <Timer class="w-3 h-3 mr-1" />
        <span>{{ period === 'all-time' ? 'All time' : `${dayjs.duration(period, "minutes").humanize().replace('a ', '1 ')}` }}</span>
      </Badge>
    </div>

    <CardContent class="py-0 px-3 h-[110px]">
        <span class="text-[80px] font-bold">
          <span v-if="category === 'score'" class="text-4xl font-medium">x</span>{{ formatNumber(quantity) }}<span v-if="category === 'run'" class="text-lg font-medium">runs</span>
          <span v-if="category === 'score'" class="text-lg font-medium">pts</span>
        </span>
    </CardContent>

    <CardFooter class="p-3 pt-0">
      <Button variant="default"
              size="lg"
              @click="!loading && buyProduct(id)"
              :disabled="false"
              class="bg-yellow-500 text-slate-900 w-full font-bold">
        <template v-if="success" class="w-16"> <Check/> </template>
        <template v-else-if="error" class="w-16"> <Check/> </template>
        <template v-else-if="loading"  class="w-16"> <LoaderCircle class="animate-spin duration-500"/> </template>
        <template v-else><ShoppingBag class="w-3 h-3 mr-1" /> Buy </template>
      </Button>
    </CardFooter>
  </Card>
</template>
