<script lang="ts" setup>
import GamePage from '~/components/pages/Game.vue'
import GameLoading from '~/components/pages/GameLoading.vue'
import { useRouteHelper } from '~/composables/useRoute'
import type { Run } from '../../back/src/run/types'
import { Limit, Seconde } from '../../back/src/utils/validators'

const router = useRouter()
const route = useRoute()
const { getIntQuery } = useRouteHelper()
const remainingRuns = getIntQuery<Run>('remainingRuns')!
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
    <GamePage v-if="( status === 'success' || index > 0) && isStartingFinish"
          :score="data.me.score"
          :runs-left="data.me.runs.remaining"
          :total-time="Seconde(10)"
          @click:exit="router.push('/')"
    >
      <template #body>
        <NuxtPage :product="data.products[index]" :page-key="index.toString()"/>
      </template>
    </GamePage>
    <GameLoading v-else @complete="() => isStartingFinish = true" />
  </div>
  <div v-else>
    End finish with stat
  </div>
</template>

