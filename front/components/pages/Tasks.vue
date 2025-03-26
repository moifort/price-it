<script setup lang="ts">
import { User } from 'lucide-vue-next'
import { Card as NativeCard } from '~/components/atoms/card'
import Stats from '~/components/molecules/Stats.vue'
import Card from '~/components/organisms/tasks/Card.vue'
import TasksTemplate from '~/components/template/Tasks.vue'
import { formatNumber } from '~/utils/utils'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'
import { Point } from '../../../back/src/score/validators'

defineProps<{ score: Score; runsLeft: Run; friends: number }>()
defineEmits<(e: 'click:invite') => void>()
</script>

<template>
  <TasksTemplate>
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex-grow">
          <h1 class="text-3xl font-medium opacity-60">Invite</h1>
        </div>
        <Stats :score="score" :runsLeft="runsLeft" />
      </div>
    </template>

    <template #invite>
      <div class="grid grid-cols-1 gap-3">
        <NativeCard class="p-3 h-[140px] text-white border-none shadow-md bg-yellow-500" @click="$emit('click:invite')">
          <div class="flex flex-col justify-between h-full">
            <div class="flex items-start">
              <font-awesome :icon="['fa', 'link']" size="4x" />
              <span class="text-3xl font-medium flex-grow text-end">Invite a friend</span>
            </div>
            <div class="text-3xl font-medium flex items-baseline">
              <div class="flex-grow">+{{ formatNumber(5000) }}<span class="text-sm opacity-65">pts</span></div>
              <div class="text-end flex-grow flex flex-row items-center"><div class="flex-grow">{{ friends }}</div> <User :size="28" class="flex"/></div>
            </div>
          </div>
        </NativeCard>
      </div>
    </template>

    <template #join>
      <div class="flex-grow">
        <h1 class="text-3xl font-medium opacity-60 mb-2">Join</h1>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <Card :points="Point(3000)" brand="telegram" class="bg-blue-400" />
      </div>
    </template>

    <template #follow>
      <h1 class="text-3xl font-medium opacity-60 mb-2">Follow</h1>
      <div class="grid grid-cols-2 gap-3">
        <Card :points="Point(5000)" brand="youtube" class="bg-red-700" />
        <Card :points="Point(5000)" brand="tiktok" class="bg-slate-800" />
        <Card :points="Point(5000)" brand="instagram" class="bg-pink-800" />
        <Card :points="Point(5000)" brand="twitter" class="bg-blue-400" />
      </div>
    </template>
  </TasksTemplate>
</template>
