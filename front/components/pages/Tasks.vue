<script setup lang="ts">
import Stats from '~/components/molecules/Stats.vue'
import ShopCard from '~/components/organisms/shop/Card.vue'
import Loading from '~/components/organisms/shop/Loading.vue'
import Ticket from '~/components/organisms/shop/Ticket.vue'
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
      </div>
    </template>

    <template #follow>
      <h1 class="text-3xl font-medium opacity-60 mb-2">Follow</h1>
      <div class="grid grid-cols-2 gap-3">
      </div>
    </template>
  </TasksTemplate>
</template>
