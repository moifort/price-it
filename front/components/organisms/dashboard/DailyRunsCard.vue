<script setup lang="ts">
import { Badge } from '@/components/atoms/badge'
import { ShoppingBag, Target, TimerReset, Zap } from 'lucide-vue-next'
import { formatNumber } from '~/utils/utils'
import type { Run as RunType } from '../../../../back/src/run/types'
import { Run } from '../../../../back/src/run/validators'

defineProps<{
  current: RunType
  total: RunType
  renewAt: Date
  bonus: RunType
}>()
defineEmits<{ 'click:buy': () => void }>()
</script>

<template>
  <Card class="relative overflow-visible">
    <div class="absolute -top-4 -right-3 z-10">
      <Badge
          class="flex items-center gap-1 shadow-lg animate-pulse bg-yellow-400 text-black border-0 px-3 py-1.5 rounded-full"
          @click="$emit('click:buy')"
      >
        <template v-if="current === 0 || bonus === 0">
          <ShoppingBag class="w-4 h-4" />
          <span class="text-sm">Buy runs</span>
        </template>
        <template v-else>
          <Zap class="w-4 h-4" />
          <span class="text-sm">+{{  formatNumber(bonus) }}</span>
        </template>
      </Badge>
    </div>
    <CardContent class="pt-6">
      <div class="flex flex-col items-center gap-2">
        <Target class="w-8 h-8 text-blue-500" />
        <h3 class="text-lg font-semibold">Daily Runs</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-primary"><Counter :value="current" /></span>
          <span class="text-sm text-muted-foreground">/{{ formatNumber(total)}}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-muted-foreground">
          <TimerReset class="w-3 h-3" />
          <span>{{ $dayjs(renewAt).fromNow(true) }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
