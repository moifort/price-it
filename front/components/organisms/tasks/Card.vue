<script setup lang="ts">
import { Card } from '~/components/atoms/card'
import type { Point } from '../../../../back/src/score/types'
import { formatNumber } from '../../../utils/utils'

defineProps<{ points: Point; brand: string }>()

// const success = ref(false)
// const loading = ref(false)
// const buyProduct = async (id: ShopProductId) => {
//   loading.value = true
//   try {
//     await props.buy(id)
//     success.value = true
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     success.value = false
//   } finally {
//     loading.value = false
//   }
// }
</script>

<template>
  <Card :class="`p-3 h-[140px] text-white border-none`">
    <div class="flex flex-col justify-between h-full">
      <div>
        <font-awesome :icon="['fab', brand]" size="3x" />
      </div>
      <div class="text-3xl font-medium">
        {{ formatNumber(points) }}<span class="text-sm opacity-65">pts</span>
      </div>
    </div>
  </Card>
</template>
