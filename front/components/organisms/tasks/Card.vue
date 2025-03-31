<script setup lang="ts">
import { Card } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Point } from '../../../../back/src/score/types'

// TODO: Add analytics
defineProps<{ points: Point; brand: string; disabled?: boolean }>()
const emit = defineEmits<(e: 'click') => void>()
</script>

<template>
  <Card
    class="p-3 h-[140px] text-white border-none shadow-md dark"
    :class="{ 'opacity-50': disabled }"
    @click="!disabled && emit('click')"
  >
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
