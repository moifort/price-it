<script setup lang="ts">
import Leaderboard from '~/components/pages/Leaderboard.vue'
import { Limit } from '../../back/src/utils/validators'

// TODO: Add display the actual Player position, confetti si appartient au top 3
const { data, status } = useAsyncGql('TopQuery', { limit: Limit(30) })
</script>

<template>
  <Leaderboard :top-players="status === 'success' ? data.topPlayers : []" />
</template>

