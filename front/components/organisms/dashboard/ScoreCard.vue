<script setup lang="ts">
import { ShoppingBag, Trophy, Zap } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { formatNumber } from '~/utils/utils'
import type { Point, Score } from '../../../../back/src/score/types'

defineProps<{ score: Score; winBonus: Point }>()
defineEmits<{ 'click:buy': () => void }>()
</script>

<template>
  <Card class="relative overflow-visible">
    <div class="absolute -top-4 -right-3 z-10">
      <Badge class="flex items-center gap-1 shadow-lg animate-pulse bg-yellow-400 text-black border-0 px-3 py-1.5 rounded-full"
             @click="$emit('click:buy')">
        <template v-if="winBonus === 0">
          <ShoppingBag class="w-4 h-4" />
          <span class="text-sm">Buy bonus</span>
        </template>
        <template v-else>
          <Zap class="w-4 h-4" />
          <span class="text-sm">+{{  formatNumber(winBonus) }}</span>
        </template>
      </Badge>
    </div>
    <CardContent class="pt-6 flex flex-col items-center justify-center gap-2 h-full">
        <Trophy class="w-12 h-12 text-yellow-500"/>
        <h2 class="text-2xl font-semibold text-center">Total Score</h2>
        <p class="text-4xl font-bold text-primary"><Counter :value="score" :duration="2" /></p>
        <p class="text-sm text-muted-foreground">Keep playing to increase your score!</p>
    </CardContent>
  </Card>
</template>


