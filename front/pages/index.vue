<script lang="ts" setup>
import { on, shareURL } from '@telegram-apps/sdk'
import Dashboard from '~/components/pages/Dashboard.vue'
import { Run } from '../../back/src/run/validators'
import { Point, Score } from '../../back/src/score/validators'
import type { Url } from '../../back/src/utils/types'
import { Seconde } from '../../back/src/utils/validators'

// TODO: Add analytics on startGame
// TODO: Reduire la taille de la page
// TODO: Add end to end test

const router = useRouter()
const { data, status, refresh } = useAsyncGql({ operation: 'PlayerQuery' })
const removeListener = on('visibility_changed', ({ is_visible }) => {
  if (is_visible) refresh()
})
onUnmounted(() => removeListener())
</script>

<template>
  <Dashboard :score="status === 'success' ? data.me.score : Score(0)"
             :time-limit="Seconde(10)"
             :total-run="status === 'success' ? data.me.runs.total : Run(0)"
             :remaining-run="status === 'success' ? data.me.runs.remaining : Run(0)"
             :run-renew-at="status === 'success' ? data.me.runs.renewAt : $dayjs().subtract(2, 'hours').toDate()"
             :run-bonus="status === 'success' ? data.me.bonus.run: Run(0)"
             :win-bonus="status === 'success' ? data.me.bonus.win : Point(0)"
             @click:startGame="router.push(`/game/0`)"
             @click:buy-runs="router.push(`/shop`)"
             @click:buy-win="router.push(`/shop`)"
  />
</template>

