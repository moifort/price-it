<script setup lang="ts">
import Stats from '~/components/molecules/Stats.vue'
import Card from '~/components/organisms/tasks/Card.vue'
import TasksTemplate from '~/components/template/Tasks.vue'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'

defineProps<{
  score: Score
  runsLeft: Run
}>()
</script>

<template>
  <TasksTemplate>
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex-grow"></div>
        <Stats :score="score" :runsLeft="runsLeft" />
      </div>
    </template>

    <template #join>
      <h1 class="text-3xl font-medium opacity-60 mb-2">Join</h1>
      <div class="grid grid-cols-2 gap-3">
        <Card :points="3000" brand="telegram" class="bg-blue-400" />
      </div>
    </template>

    <template #follow>
      <h1 class="text-3xl font-medium opacity-60 mb-2">Follow</h1>
      <div class="grid grid-cols-2 gap-3">
        <Card :points="5000" brand="youtube" class="bg-red-700" />
        <Card :points="5000" brand="tiktok" class="bg-slate-800" />
        <Card :points="5000" brand="instagram" class="bg-pink-800" />
        <Card :points="5000" brand="twitter" class="bg-blue-400" />
      </div>
    </template>
  </TasksTemplate>
</template>
