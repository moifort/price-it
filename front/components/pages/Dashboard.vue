<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import GameStartButton from '~/components/molecules/dashboard/GameStartButton.vue'
import BestTimeCard from '~/components/organisms/dashboard/BestTimeCard.vue'
import DailyRunsCard from '~/components/organisms/dashboard/DailyRunsCard.vue'
import ScoreCard from '~/components/organisms/dashboard/ScoreCard.vue'
import Dashboard from '~/components/template/Dashboard.vue'
import type { Score } from '../../../back/src/score/types'
import type { Seconde } from '../../../back/src/utils/types'

defineEmits<(e: 'click:startGame') => void>()
defineProps<{ score: Score; totalRun: number; remainingRun: number; bestTime: Seconde }>()
</script>

<template>
  <Dashboard>
    <template #title>
      <div class="flex items-center justify-center w-full gap-2">
        <h1 class="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Price It!
        </h1>
        <Star class="w-8 h-8 text-yellow-500 animate-pulse" />
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <ScoreCard :score="score" />
        <div class="grid grid-cols-2 gap-4">
          <DailyRunsCard :current="remainingRun" :total="totalRun" />
          <BestTimeCard :time="bestTime" />
        </div>
      </div>
    </template>

    <template #action>
      <GameStartButton  @click="$emit('click:startGame')" />
    </template>
  </Dashboard>
</template>
