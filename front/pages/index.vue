<script lang="ts" setup>
import Dashboard from '~/components/pages/Dashboard.vue'
import { Score } from '../../back/src/score/validators'
import { Seconde } from '../../back/src/utils/validators'

const { data, status } = useAsyncGql({ operation: 'Player' })
</script>

<template>
  <Dashboard :score="status === 'success' ? data.me.score : Score(0)"  :total-run="10" :best-time="Seconde(8)" :remaining-run="7" />
</template>

