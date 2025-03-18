<script setup lang="ts">
import { Home, Rocket, Sparkles, Trophy } from 'lucide-vue-next'
import Game from '~/components/template/Game.vue'
import type { Score } from '../../../../back/src/score/types'

defineProps<{ score: Score }>()
defineEmits<(e: 'click:exit') => void>()
</script>

<template>
  <Game>
    <template #body>
      <div class="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div class="text-4xl flex items-center gap-3 text-yellow-500 mb-6">
          <Trophy class="h-[70px] w-[70px]" />
        </div>

        <div class="mt-3 flex flex-col items-center">
          <span class="text-lg font-bold text-primary">Total Score</span>
          <span class="text-5xl font-bold text-primary mt-2">
            <Counter :from="0" :value="score" :duration="2" />
          </span>
        </div>

        <div class="mt-10">
          <Button size="lg" @click="$emit('click:exit')">
            <Home class="h-5 w-5" />
            Go Back to Dashboard
          </Button>
        </div>
      </div>
    </template>
  </Game>
</template>
