<template>
  <div class="flex items-center justify-between">
    <Button
      variant="outline"
      @click="onExit"
      class="gap-2 transition-all hover:bg-destructive hover:text-destructive-foreground"
    >
      <ArrowLeft class="w-4 h-4" />
      Exit Game
    </Button>

    <div class="flex items-center gap-4 bg-card p-2 px-4 rounded-full shadow-md">
      <div class="flex items-center gap-1.5">
        <Trophy class="w-5 h-5 text-yellow-500" />
        <span class="font-bold">{{ score }}</span>
      </div>
      <div class="h-4 w-px bg-border/60" />
      <div class="font-medium text-sm text-muted-foreground">
        Runs: <span class="text-foreground font-semibold">{{ runsLeft }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Trophy } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import type { Score } from '../../../../back/src/score/types'

defineProps<{
  score: Score
  runsLeft: number
  onExit: () => void
}>()
</script> 