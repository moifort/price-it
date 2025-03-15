<script lang="ts" setup>
import Dashboard from '~/components/pages/Dashboard.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import { Seconde } from '../../back/src/utils/validators'

const { data, status } = useAsyncGql({ operation: 'Player' })
</script>

<template>
  <Dashboard :score="status === 'success' ? data.me.score : Score(0)"
             :best-time="Seconde(10)"
             :total-run="status === 'success' ? data.me.runs.total : Run(0)"
             :remaining-run="status === 'success' ? data.me.runs.remaining : Run(0)" />
</template>

