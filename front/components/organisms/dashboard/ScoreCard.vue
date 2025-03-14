<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import type { Score } from '../../../../back/src/score/types'

defineProps<{ score: Score }>()
</script>

<template>
  <Card class="relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-16 -translate-y-16" />
    <CardContent class="pt-6">
      <div class="flex flex-col items-center gap-2">
        <Trophy class="w-12 h-12 text-yellow-500"/>
        <h2 class="text-2xl font-semibold text-center">Total Score</h2>
        <p class="text-4xl font-bold text-primary"><Counter :value="score" :duration="2" /></p>
        <p class="text-sm text-muted-foreground">Keep playing to increase your score!</p>
      </div>
    </CardContent>
  </Card>
</template>


