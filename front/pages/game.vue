<script lang="ts" setup>
import Game from '~/components/pages/Game/Game.vue'
import GameEnd from '~/components/pages/Game/GameEnd.vue'
import GameStart from '~/components/pages/Game/GameStart.vue'
import type { Run } from '../../back/src/run/types'
import { Limit, Seconde } from '../../back/src/utils/validators'

definePageMeta({ layout: 'fullscreen' })
const router = useRouter()
const route = useRoute()
const remainingRuns = getIntQuery<Run>('remainingRuns')
const { data, status, refresh } = useAsyncGql('Game', { limit: Limit(Number(remainingRuns) ?? 0) })
const index = ref(0)
watch(
  () => route.params.id,
  (value) => {
    index.value = Number(value)
    refresh()
  },
)

const isStartingFinish = ref(false)
</script>

<template>
  <div v-if="index < remainingRuns">
    <Game v-if="( status === 'success' || index > 0) && isStartingFinish"
          :score="data.me.score"
          :runs-left="data.me.runs.remaining"
          @click:exit="router.push('/')"
    >
      <template #body>
        <NuxtPage
            :product="data.products[index]"
            :totalTime="Seconde(10)"
            :page-key="index.toString()"
        />
      </template>
    </Game>
    <GameStart v-else @complete="() => isStartingFinish = true" />
  </div>
  <div v-else>
    <GameEnd @click:exit="router.push('/')" :score="data.me.score" />
  </div>
</template>

