<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import GameStartButton from '~/components/molecules/dashboard/GameStartButton.vue'
import BestTimeCard from '~/components/organisms/dashboard/BestTimeCard.vue'
import DailyRunsCard from '~/components/organisms/dashboard/DailyRunsCard.vue'
import ScoreCard from '~/components/organisms/dashboard/ScoreCard.vue'
import Dashboard from '~/components/template/Dashboard.vue'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'
import type { Seconde } from '../../../back/src/utils/types'

defineProps<{
  score: Score
  timeLimit: Seconde
  totalRun: Run
  remainingRun: Run
  runRenewAt: Date
  runBonus: Run
  timeBonus: Seconde
}>()

defineEmits<{
  (e: 'click:startGame'): void
  (e: 'click:buyRuns'): void
  (e: 'click:buyTime'): void
}>()
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
        <ScoreCard :score="score" class="h-full"/>
    </template>

    <template #subbody>
      <div class="grid grid-cols-2 gap-4 pt-2">
        <DailyRunsCard :current="remainingRun" :total="totalRun" :renew-at="runRenewAt" :bonus="runBonus" @click:buy="$emit('click:buyRuns')"/>
        <BestTimeCard :time="timeLimit" :bonus="timeBonus" @click:buy="$emit('click:buyTime')"/>
      </div>
    </template>

    <template #action>
      <GameStartButton  @click="$emit('click:startGame')" />
    </template>
  </Dashboard>
</template>
