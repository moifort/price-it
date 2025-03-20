<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import type { Score } from '../../../../back/src/score/types'

defineProps<{ players: { name: string; score: Score; rank: number }[] }>()
</script>

<template>
  <Card v-for="{name, score, rank} in players" class="mt-2">
    <CardContent class="p-2">
        <div class="flex items-center">
          <div class="text-xl w-8">
            <span v-if="rank === 1 "> 🥇 </span>
            <span v-else-if="rank === 2"> 🥈 </span>
            <span v-else-if="rank === 3"> 🥉 </span>
            <span v-else class="text-lg ml-2"> {{ rank }} </span>
          </div>
          <div class="ml-4 flex-grow px-2 capitalize">
            {{ name }}
          </div>
          <div class="font-medium px-2">
            {{ score }}
          </div>
          <div>
            <Trophy class="h-5 w-5 text-yellow-500" />
          </div>
        </div>
    </CardContent>
  </Card>
</template>

