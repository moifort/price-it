<script setup lang="ts">
import Leaderboard from '~/components/pages/Leaderboard.vue'
import { Score } from '../../back/src/score/validators'

const topPlayers = [
  { name: 'kungfux010', score: Score(76605), rank: 1 },
  { name: 'NextOrders', score: Score(64972), rank: 2 },
  { name: 'Николай', score: Score(38654), rank: 3 },
  { name: 'Darya', score: Score(16906), rank: 4 },
  { name: 'Player5', score: Score(13130), rank: 5 },
  { name: 'Player6', score: Score(12511), rank: 6 },
  { name: 'Аня', score: Score(9838), rank: 7 },
]
</script>

<template>
  <Leaderboard :top-players="topPlayers" />
</template>

