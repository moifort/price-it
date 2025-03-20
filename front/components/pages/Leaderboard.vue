<script setup lang="ts">
import Header from '~/components/organisms/leaderboard/Header.vue'
import Table from '~/components/organisms/leaderboard/Table.vue'
import Leaderboard from '~/components/template/Leaderboard.vue'
import type { Score } from '../../../back/src/score/types'

defineProps<{ topPlayers: { name: string; score: Score; rank: number }[]; isLoading: boolean }>()
</script>

<template>
  <Leaderboard>
    <template #title>
      <h1 class="text-3xl font-medium opacity-60">Top Players</h1>
    </template>

    <template #body>
      <Header class="mb-4"/>
      <Table :players="topPlayers" />
    </template>
  </Leaderboard>
</template>


