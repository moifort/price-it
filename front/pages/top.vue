<script setup lang="ts">
import Leaderboard from '~/components/pages/Leaderboard.vue'
import { Limit } from '../../back/src/utils/validators'

const { data, status } = useAsyncGql('TopPlayers', { limit: Limit(30) })
</script>

<template>
  <Leaderboard :top-players="status === 'success' ? data.topPlayers : []" />
</template>

