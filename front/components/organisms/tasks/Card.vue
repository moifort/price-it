<script setup lang="ts">
import { Card } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Point } from '../../../../back/src/score/types'

// TODO: Add analytics
defineProps<{ points: Point; brand: string }>()
</script>

<template>
  <Card class="p-3 h-[140px] text-white border-none shadow-md">
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
