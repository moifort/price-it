<script setup lang="ts">
import { Target, Trophy } from 'lucide-vue-next'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'

defineProps<{ score: Score; runsLeft: Run }>()
</script>

<template>
  <div class="flex items-center gap-4 bg-card p-2 px-4 rounded-full shadow-md border-[1px]">
    <div class="flex items-center gap-1.5">
      <Trophy class="w-5 h-5 text-yellow-500" />
      <span class="font-bold"><Counter :value="score" :duration="1" /></span>
    </div>
    <div class="h-4 w-px bg-border/60" />
    <div class="flex items-center gap-1.5">
      <Target class="w-5 h-5 text-blue-500" />
      <span class="text-foreground font-semibold">{{ runsLeft }}</span>
    </div>
  </div>
</template>
