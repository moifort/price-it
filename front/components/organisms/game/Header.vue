<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import Stats from '~/components/molecules/Stats.vue'
import type { Run } from '../../../../back/src/run/types'
import type { Score } from '../../../../back/src/score/types'

defineProps<{ score: Score; runsLeft: Run }>()
defineEmits<(e: 'click:exit') => void>()
</script>

<template>
  <div class="flex items-center justify-between">
    <Button
      variant="outline"
      @click="$emit('click:exit')"
      class="gap-2 transition-all hover:bg-destructive hover:text-destructive-foreground"
    >
      <ArrowLeft class="w-4 h-4" />
      Exit Game
    </Button>

    <Stats :score="score" :runsLeft="runsLeft" />
  </div>
</template>

