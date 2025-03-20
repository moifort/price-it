<script setup lang="ts">
import { ShoppingBag, Timer } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { Button } from '~/components/atoms/button'
import { Card, CardContent, CardFooter } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Point } from '../../../../back/src/score/types'
import type { Period, ShopProductId } from '../../../../back/src/shop/types'
import type { Quantity } from '../../../../back/src/utils/types'

defineProps<{
  id: ShopProductId
  quantity: Quantity
  period: Period
  amount: Point
}>()
</script>

<template>
  <Card class="relative">
    <div class="absolute top-0 right-0 z-10">
      <Badge variant="default" class="py-1 px-2 flex rounded-br-none rounded-tl-none"
             :class="period === 'all-time' ? 'bg-purple-500' : 'bg-blue-500'">
        <Timer class="w-3 h-3 mr-1" />
        <span>{{ period === 'all-time' ? 'All time' : `${period} min` }}</span>
      </Badge>
    </div>

    <CardContent class="py-0 px-3 h-[110px]">
        <span class="text-[80px] font-bold">
          {{ formatNumber(quantity) }}<span class="text-lg font-medium">runs</span>
        </span>
    </CardContent>

    <CardFooter class="p-3 pt-0">
      <Button variant="default"
              size="lg"
              @click="$emit('buy', { id, quantity, period, amount })"
              class="bg-yellow-500 text-slate-900 w-full font-bold">
        <ShoppingBag class="w-3 h-3 mr-1" />
        {{ formatNumber(amount) }}pts
      </Button>
    </CardFooter>
  </Card>
</template>
