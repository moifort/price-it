<script setup lang="ts">
import { ShoppingBag, Timer } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { Button } from '~/components/atoms/button'
import { Card, CardContent, CardFooter } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Period, ShopProductId } from '../../../../back/src/shop/types'
import type { Amount, Quantity } from '../../../../back/src/utils/types'

defineProps<{
  id: ShopProductId
  quantity: Quantity
  period: Period
  amount: Amount
}>()
</script>

<template>
  <Card>
    <CardContent class="p-3">
      <div class="text-center">
        <span class="text-5xl font-bold">{{ formatNumber(quantity) }}</span>
        <span class="text-sm mt-1 block">runs</span>
      </div>

      <Badge class="flex items-center" variant="outline">
        <Timer class="w-4 h-4" />
        <span>{{ period === 'all-time' ? 'Forever' : `${period} min` }}</span>
      </Badge>
    </CardContent>

    <CardFooter class="p-3">
      <Button variant="default"
              size="lg"
              @click="$emit('buy', { id, quantity, period, amount })"
              class="bg-yellow-400 text-black w-full">
        <ShoppingBag class="w-4 h-4" />
        buy for {{ formatNumber(amount) }}pts
      </Button>
    </CardFooter>
  </Card>
</template>
