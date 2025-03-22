<script lang="ts" setup>
import { on } from '@telegram-apps/sdk'
import Dashboard from '~/components/pages/Dashboard.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import { Seconde } from '../../back/src/utils/validators'

const router = useRouter()
const { data, status, refresh } = useAsyncGql({ operation: 'Player' })
const removeListener = on('visibility_changed', ({ is_visible }) => {
  if (is_visible) refresh()
})
onUnmounted(() => removeListener())
// TODO: Add analytics on startGame
</script>

<template>
  <Dashboard :score="status === 'success' ? data.me.score : Score(0)"
             :time-limit="Seconde(10)"
             :total-run="status === 'success' ? data.me.runs.total : Run(0)"
             :remaining-run="status === 'success' ? data.me.runs.remaining : Run(0)"
             :run-renew-at="status === 'success' ? data.me.runs.renewAt : $dayjs().subtract(2, 'hours').toDate()"
             :run-bonus="Run(0)"
             :time-bonus="Seconde(0)"
             @click:startGame="router.push(`/game/0?remainingRuns=${data.me.runs.remaining}`)"
             @click:buy-runs="router.push(`/shop`)"
             @click:buy-time="router.push(`/shop`)"
  />
</template>

