<script setup lang="ts">
import Header from '~/components/organisms/leaderboard/Header.vue'
import Table from '~/components/organisms/leaderboard/Table.vue'
import MainTemplate from '~/components/template/Main.vue'
import type { Score } from '../../../back/src/score/types'

defineProps<{ topPlayers: { name: string; score: Score; rank: number }[] }>()
</script>

<template>
  <MainTemplate>
    <template #title>
      <h1 class="text-3xl font-medium opacity-60">Top Players</h1>
    </template>

    <template #body>
      <Header class="mb-4"/>
      <Table :players="topPlayers" />
    </template>
  </MainTemplate>
</template>


