<script setup lang="ts">
import { ShoppingBag, Timer } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { Button } from '~/components/atoms/button'
import { Card, CardContent } from '~/components/atoms/card'
import MainTemplate from '~/components/template/Main.vue'
import { formatNumber } from '~/utils/utils'
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
        <Card v-for="product in products" :key="product.id" >
          <CardContent class="p-3" >
              <div class="text-center">
                <span class="text-5xl font-bold">{{ product.quantity }}</span>
                <span class="text-sm mt-1 block">runs</span>
              </div>

              <Badge class="flex items-cente" variant="outline">
                <Timer class="w-4 h-4" />
                <span>{{ product.period === 'all-time' ? 'Forever' : `${product.period} min` }}</span>
              </Badge>
          </CardContent>

          <CardFooter class="p-3">
            <Button variant="default"
                    size="lg"
                    @click="$emit('buy', product)"
                    class="bg-yellow-400 text-black w-full">
              <ShoppingBag class="w-4 h-4" />
              buy for {{ formatNumber(product.amount) }}pts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </MainTemplate>
</template>
